import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../Header/Header";
import "./MainLayout.css";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Stack
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                    className="math-pyramid"
                >
                    <Suspense fallback={<div>Loading...</div>}>
                        <Outlet />
                    </Suspense>
                </Stack>
            </main>
        </>
    );
}