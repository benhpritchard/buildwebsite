import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    // Handle CORS
    if (req.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            status: 204,
        });
    }

    try {
        const base44 = createClientFromRequest(req);
        
        // Check if request is JSON
        const contentType = req.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
             return new Response("Invalid content type", { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
        }

        const payload = await req.json();
        const { student_id, class_id, year_group, term, lesson_number, score } = payload;

        // Basic validation
        if (!student_id || !class_id || !year_group || !term || !lesson_number || score === undefined) {
            return Response.json({ error: "Missing required fields" }, { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
        }

        // Create the assessment record
        // We use asServiceRole to ensure we can write to the entity regardless of current user permissions
        // We explicitly do NOT check base44.auth.me() because this endpoint is called by external games
        // that may not share the session/cookie of the app.
        
        const record = await base44.asServiceRole.entities.Assessment.create({
            student_id,
            class_id,
            year_group,
            term,
            lesson_number,
            score
        });

        // Award points equal to the score to the student
        try {
            const studentList = await base44.asServiceRole.entities.Student.filter({ id: student_id });
            if (studentList && studentList.length > 0) {
                const student = studentList[0];
                const newPoints = (student.total_points || 0) + (parseInt(score) || 0);
                await base44.asServiceRole.entities.Student.update(student.id, {
                    total_points: newPoints
                });
            }
        } catch (err) {
            console.error("Error awarding points:", err);
            // Don't fail the request if point awarding fails, just log it
        }

        return Response.json({ success: true, id: record.id }, { headers: { "Access-Control-Allow-Origin": "*" } });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500, headers: { "Access-Control-Allow-Origin": "*" } });
    }
});