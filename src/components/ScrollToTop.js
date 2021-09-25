import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import contactus from "../pages/contactus";

export default function ScrollToTop(){
    const{pathname} = useLocation();

    useEffect(
        () => {
            window.scrollTo(0,0);
        },
        [pathname]
    );
    return null;
}