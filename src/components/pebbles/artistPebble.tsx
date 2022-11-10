import { Center, Flex, Text } from "@chakra-ui/react";
import { pebblePhysics } from "../../utils/types/pebbles";
import { useArtists } from "../../utils/hooks/useArtists";
import Image from "next/image";
import { useEffect, useState } from "react";
import { setHoveringType } from "../../utils/types/state";

export default function ArtistPebble(props: {
    info: pebblePhysics;
    setHovering: setHoveringType;
}) {
    const artists = useArtists();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (artists.length > 4) {
            setLoaded(true);
        }
    }, [artists]);

    const HU = props.info.dims.height / 6 - 20; // Height Unit
    const WU = props.info.dims.width / 6 - 20; // Width Unit

    return (
        <Center
            zIndex={5}
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
                    text: "Artists",
                });
            }}
            onMouseOut={() => {
                props.setHovering({ hovering: false });
            }}
        >
            {loaded ? (
                <Flex flexDir={"column"}>
                    <Flex flexDir={"row"} m={"10px"}>
                        <Flex
                            h={"fit-content"}
                            borderRadius={"10px"}
                            overflow={"hidden"}
                        >
                            <Image
                                src={artists[0].images[0].url}
                                alt={"Artist Image"}
                                width={artists[0].images[0].width * WU * 2}
                                height={artists[0].images[0].height * HU * 2}
                            />
                        </Flex>
                        <Flex
                            ml={3}
                            flexDir={"column"}
                            h={2 * HU}
                            maxW={4 * WU}
                            pb={2}
                            justifyContent={"center"}
                            overflow={"hidden"}
                        >
                            <Text fontSize={"md"}>1. {artists[0].name}</Text>
                            <Text fontSize={"sm"} color={"whiteAlpha.500"}>
                                {artists[0].genres.slice(0, 4).join(", ")}...
                            </Text>
                        </Flex>
                    </Flex>
                    {artists.slice(1, 5).map((artist, index) => (
                        <Flex key={index} flexDir={"row"} m={"10px"} h={HU}>
                            <Flex
                                h={"fit-content"}
                                borderRadius={"10px"}
                                overflow={"hidden"}
                            >
                                <Image
                                    src={artist.images[0].url}
                                    alt={"Artist Image"}
                                    width={artist.images[0].width * WU}
                                    height={artist.images[0].height * HU}
                                />
                            </Flex>
                            <Flex
                                ml={3}
                                flexDir={"column"}
                                maxW={"60%"}
                                h={HU}
                                justifyContent={"center"}
                                overflow={"hidden"}
                            >
                                <Text fontSize={"sm"}>
                                    {index + 2}. {artist.name}
                                </Text>

                                <Text fontSize={"xs"} color={"whiteAlpha.500"}>
                                    {artist.genres.slice(0, 4).join(", ")}...
                                </Text>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            ) : (
                <Center w={"100%"} h={"100%"}>
                    Loading your artists...
                </Center>
            )}
        </Center>
    );
}
