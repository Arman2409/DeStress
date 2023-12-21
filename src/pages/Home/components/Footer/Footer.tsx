import styles from "../../../../styles/components/Footer.module.scss";
import configs from "../../../../configs/components";

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