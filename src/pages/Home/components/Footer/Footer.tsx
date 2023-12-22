import styles from "../../../../styles/pages/Home/components/Footer.module.scss";
import configs from "../../../../configs/home";

const {
    topCopyright,
    bottomCopyright
} = { ...configs }

const Footer = () => (
    <div className={styles.footer_main}>
        <p>
            {topCopyright}
        </p>
        <p>
            {bottomCopyright}
        </p>
    </div>
)

export default Footer;