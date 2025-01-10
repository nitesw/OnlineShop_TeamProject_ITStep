import { Anchor, Container, Group } from '@mantine/core';
import classes from './css/footer.module.css';

const links = [
    { link: '#', label: 'Store' },
    { link: '#', label: 'Community' },
    { link: '#', label: 'About' },
    { link: '#', label: 'Support' },
];

const Footer = () => {
    const items = links.map((link) => (
        <Anchor<'a'>
            c="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <div>Logo</div>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    )
}

export default Footer;