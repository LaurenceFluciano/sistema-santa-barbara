import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const Components = lazy(() => import('@/application/pages/Components'));
const ProfilePage = lazy(() => import('@/application/pages/ProfilePage'));

function AppRoutes() {
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Carregando...</div>}>
                <Routes>
                    <Route path="/dev/components" element={<Components/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRoutes;