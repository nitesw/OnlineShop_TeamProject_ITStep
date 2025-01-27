import { Anchor, Container, Group } from '@mantine/core';
import classes from './css/footer.module.css';
import logo from "../../../assets/banner_png.png";
import {Link} from "react-router-dom";

const links = [
    { link: '/', label: 'Store' },
    { link: '/community', label: 'Community' },
    { link: '/about', label: 'About' },
    { link: '/support', label: 'Support' },
];

const Footer = () => {
    const items = links.map((link) => (
        <Anchor<'a'>
            c="dimmed"
            key={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            <Link to={link.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                {link.label}
            </Link>
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center'  }}>
                    <img src={logo} alt="Logo" style={{height: '64px'}} draggable={false}/>
                </Link>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    )
}

export default Footer;