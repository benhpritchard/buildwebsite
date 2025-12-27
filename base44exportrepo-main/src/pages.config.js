import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AssessmentPage from './pages/AssessmentPage';
import CPD from './pages/CPD';
import ClassUnlocks from './pages/ClassUnlocks';
import Contact from './pages/Contact';
import ExploreGames from './pages/ExploreGames';
import Home from './pages/Home';
import MainAdminDashboard from './pages/MainAdminDashboard';
import StudentLogin from './pages/StudentLogin';
import StudentProgressDashboard from './pages/StudentProgressDashboard';
import TakeQuiz from './pages/TakeQuiz';
import ViewResources from './pages/ViewResources';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "AdminDashboard": AdminDashboard,
    "AdminLogin": AdminLogin,
    "AssessmentPage": AssessmentPage,
    "CPD": CPD,
    "ClassUnlocks": ClassUnlocks,
    "Contact": Contact,
    "ExploreGames": ExploreGames,
    "Home": Home,
    "MainAdminDashboard": MainAdminDashboard,
    "StudentLogin": StudentLogin,
    "StudentProgressDashboard": StudentProgressDashboard,
    "TakeQuiz": TakeQuiz,
    "ViewResources": ViewResources,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};