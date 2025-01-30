import LoginTitle from "../../components/common/login/login_title.tsx";
import LoginForm from "../../components/common/login/login_form.tsx";
import {Container} from "@mantine/core";

const LoginPage = () => {
    return (
        <>
            <Container size={420} my={40}>
                <LoginTitle />
                <LoginForm />
            </Container>
        </>
    )
}

export default LoginPage;