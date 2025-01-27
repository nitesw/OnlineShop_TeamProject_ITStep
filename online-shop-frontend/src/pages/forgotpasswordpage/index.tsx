import ForgotPasswordTitle from "../../components/common/forgotpassword/forgotpassword_title.tsx";
import ForgotPasswordForm from "../../components/common/forgotpassword/forgotpassword_form.tsx";
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