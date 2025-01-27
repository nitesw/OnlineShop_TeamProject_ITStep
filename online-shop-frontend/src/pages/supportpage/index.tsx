import SupportTitle from "../../components/common/support/support_title.tsx";
import SupportForm from "../../components/common/support/support_form.tsx";
import {Container} from "@mantine/core";

const SupportPage = () => {
    return(
        <Container>
            <SupportTitle/>
            <SupportForm/>
        </Container>
    )
}

export default SupportPage;