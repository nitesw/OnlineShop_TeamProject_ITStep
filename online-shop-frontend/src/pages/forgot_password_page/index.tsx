import ForgotPasswordTitle from "../../components/common/forgot_password/forgotpassword_title.tsx";
import ForgotPasswordForm from "../../components/common/forgot_password/forgotpassword_form.tsx";
import {Container} from "@mantine/core";

const ForgotPasswordPage = () => {
    return(
        <Container size={460} my={30}>
            <ForgotPasswordTitle />
            <ForgotPasswordForm />
        </Container>
    )
}

export default ForgotPasswordPage;