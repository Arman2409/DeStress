import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

import styles from "../../../../../../styles/pages/Home/components/Greeting/components/LettersAnimation.module.scss";
import type { SubtitleDetails } from "../../../../../../types/home";
import configs from "../../../../../../configs/home";
import { getSpacingAndWidth } from "./utils/functions";

const { subTitle } = { ...configs };

const LettersAnimation = () => {
    const details = getSpacingAndWidth(window.innerWidth);
    const { spacing = 0, width = 0 } = { ...details };

    const [letterDetails, setLetterDetails] = useState<SubtitleDetails>({ spacing, width })
    const lettersInitialized = useRef<boolean>(false);
    const lettersMain = useRef<any>(null);

    useEffect(() => {
        if (lettersInitialized.current) return;
        lettersInitialized.current = true;
        const windowWidth = window.innerWidth;
        const letters = subTitle.split("");
        letters.forEach((letter: string, order: number) => {
            const letterP = document.createElement("p");
            letterP.innerHTML = letter;
            letterP.setAttribute("class", styles.letters_title_letter)
            letterP.style.top = Math.round(windowWidth * Math.random()) + "px"
            letterP.style.left = Math.round(windowWidth * Math.random()) + "px"
            lettersMain.current.appendChild(letterP);
            animate(letterP,
                {
                    top: 0 + "px",
                    left: 0 + Number(order) * letterDetails.spacing + "px"
                },
                { duration: 1 })
        })
        window.addEventListener("resize", () => {
            const details = getSpacingAndWidth(window.innerWidth);
            const { spacing: letterSpacing = 0, width: titleWidth = 0 } = { ...details };

            setLetterDetails((currentDetails: SubtitleDetails) => {
                const { spacing, width } = { ...currentDetails }
                if (spacing !== letterSpacing || width !== width) {
                    lettersInitialized.current = false;
                    lettersMain.current.innerHTML = "";
                    return {
                        spacing: letterSpacing,
                        width: titleWidth
                    }
                }
                return currentDetails;
            })
        })
    }, [spacing, width, setLetterDetails])

    return (
        <div
            ref={lettersMain}
            className={styles.letters_title}
            style={{ width: letterDetails.width }} />
    )
}

export default LettersAnimation;