import { useProfile } from "../../utils/hooks/useProfile";
import { Center } from "@chakra-ui/react";
import Image from "next/image";
import { pebblePhysics } from "../../utils/types/pebbles";
import { setHoveringType } from "../../utils/types/state";

export default function ProfilePebble(props: {
    info: pebblePhysics;
    setHovering: setHoveringType;
}) {
    const profile = useProfile();
    return (
        <Center
            w={`${props.info.dims.width}px`}
            h={`${props.info.dims.height}px`}
            bottom={`${props.info.pos.y}px`}
            left={`${props.info.pos.x}px`}
            borderRadius={"15px"}
            boxShadow={"#333 2px 4px 8px"}
            overflow={"hidden"}
            bg={"blackAlpha.600"}
            pos={"absolute"}
            _hover={{ bg: "blackAlpha.700", transform: "scale(1.01)" }}
            transition={"0.1s ease-in-out"}
            onMouseOver={() => {
                props.setHovering({
                    hovering: true,
                    type: "text",
                    text: profile.profile?.display_name
                        ? `Hi ${profile.profile?.display_name}!`
                        : "Loading...",
                });
            }}
            onMouseOut={() => {
                props.setHovering({ hovering: false });
            }}
        >
            <Image
                src={profile.profile?.image_url ?? "/unknown.png"}
                alt={"Profile picture of " + profile.profile?.display_name}
                width={props.info.dims.width}
                height={props.info.dims.height}
            />
        </Center>
    );
}