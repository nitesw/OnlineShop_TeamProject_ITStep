import SupportTitle from "../../components/common/support/support_title.tsx";
import SupportForm from "../../components/common/support/support_form.tsx";
import {Container, Flex} from "@mantine/core";

const SupportPage = () => {
    return(
        <Container>
            <Flex direction="column" align="center" >
                <SupportTitle/>
                <SupportForm/>
            </Flex>
        </Container>
    )
}

export default SupportPage;