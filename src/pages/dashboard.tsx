import { Box } from "@chakra-ui/react";
import { UseProfile } from "../utils/hooks/useProfile";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loading } from "../components/dashboard/loading";
import { Welcome } from "../components/dashboard/welcome";

const Page = () => {
    const profileState = UseProfile();
    const router = useRouter();
    const [curComponent, setCurComponent] = useState(<Loading />);

    useEffect(() => {
        if (profileState.error) {
            router.push("/").catch(console.error);
        } else if (profileState.profile) {
            setCurComponent(<Welcome profile={profileState.profile} />);
        } else {
            setCurComponent(<Loading />);
        }
    }, [profileState]);

    return (
        <Box h={"100vh"} w={"100%"}>
            {curComponent}
        </Box>
    );
};

export default Page;
