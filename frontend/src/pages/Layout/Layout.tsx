import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Headers";

function Layout () {
    return (
        <main className="main-content">
            <Header/>
            <Outlet/>

        </main>
    )

}

export default Layout;