import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
    try {
        if (req.method !== 'POST') {
            return Response.json({ error: 'Method not allowed' }, { status: 405 });
        }

        const base44 = createClientFromRequest(req);
        const { eventTitle, eventDate, name, email, school, notes } = await req.json();

        // Send email to admin (FinnQuest owner)
        // In a real app, you'd put the actual admin email here. 
        // For now we'll send it to the logged in user or a placeholder if we can't find one, 
        // but typically this goes to 'info@finnquest.com' etc.
        // using the app owner email if available via some config or just hardcoded for this demo context.
        
        const adminEmail = "info@finnquest.com"; // Replace with actual admin email if known

        await base44.integrations.Core.SendEmail({
            to: adminEmail,
            subject: `New CPD Booking Enquiry: ${eventTitle}`,
            body: `
                New booking enquiry received.
                
                Event: ${eventTitle}
                Date: ${eventDate}
                
                Applicant Details:
                Name: ${name}
                Email: ${email}
                School: ${school}
                
                Notes:
                ${notes || 'None'}
            `
        });

        // Send confirmation to user
        await base44.integrations.Core.SendEmail({
            to: email,
            subject: `Booking Enquiry Received - ${eventTitle}`,
            body: `
                Dear ${name},
                
                Thank you for your interest in "${eventTitle}".
                
                We have received your booking enquiry and will be in touch shortly to confirm details.
                
                Best regards,
                The FinnQuest Team
            `
        });

        return Response.json({ success: true });

    } catch (error) {
        console.error("Email error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
});