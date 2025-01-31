import {Container} from "@mantine/core";
import SignupForm from "../../components/common/signup/signup_form.tsx";
import SignupTitle from "../../components/common/signup/signup_title.tsx";

const SignupPage = () => {
    return (
        <>
            <Container size={420}>
                <SignupTitle />
                <SignupForm />
            </Container>
        </>
    )
}

export default SignupPage;