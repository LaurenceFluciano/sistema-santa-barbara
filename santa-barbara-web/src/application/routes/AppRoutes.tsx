import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";

const Components = lazy(() => import('@/application/pages/Components'));

function AppRoutes() {
    return(
        <BrowserRouter>
            <Suspense fallback={<div>Carregando...</div>}>
                <Routes>
                    <Route path="/dev/components" element={<Components/>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRoutes;