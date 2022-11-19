import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { pebblePhysics } from "../../utils/types/pebbles";
import { audioPlayerType, setHoveringType } from "../../utils/types/state";
import Image from "next/image";
import { useScreen } from "../../utils/hooks/useScreen";
import {
    songApiResponseType,
    songType,
    timeFrameType,
} from "../../utils/types/spotify";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { overlayStateType } from "../../utils/types/overlay";

export default function SongPebble(props: {
    info: pebblePhysics;
    setHovering: setHoveringType;
    time: timeFrameType;
    setOverlay: Dispatch<SetStateAction<overlayStateType>>;
    audioPlayer: audioPlayerType;
    allSongs: songApiResponseType;
}) {
    // TODO: Add links to spotify everywhere lol
    const [loaded, setLoaded] = useState(true);
    const [songs, setSongs] = useState<songType[]>([]);
    const HU = props.info.dims.height / 10;
    const WU = props.info.dims.width / 10;

    useEffect(() => {
        setLoaded(false);
        const current = props.allSongs[props.time];
        if (current) {
            setSongs(current);
        }
    }, [props.allSongs, props.time]);

    useEffect(() => {
        console.log("Rendering song pebble");
        if (songs.length > 4) {
            setLoaded(true);
        } else {
            console.log("Not enough songs, songs: " + songs);
        }
    }, [songs]);

    function openSongOverlay() {
        props.setOverlay({
            hidden: false,
            type: "songs",
            songs: props.allSongs,
        });
        console.log("open song overlay");
    }

    function openSongHovering() {
        props.setHovering({
            hovering: true,
            type: "text",
            text: "Songs",
            x: "left",
            y: "top",
        });
    }

    function closeHovering() {
        props.setHovering({
            hovering: false,
        });
    }

    return (
        <Flex
            w={`${props.info.dims.width}px`}
            h={`${props.info.dims.height}px`}
            bottom={`${props.info.pos.y}px`}
            left={`${props.info.pos.x}px`}
            borderRadius={"15px"}
            boxShadow={"#333 2px 4px 8px"}
            overflow={"hidden"}
            bg={"blackAlpha.600"}
            pos={"absolute"}
            flexDir={"column"}
            py={`${HU * 0.25}px`}
            px={`${WU * 0.25}px`}
            justifyContent={"center"}
            alignItems={"center"}
            zIndex={5}
            _hover={{ bg: "blackAlpha.700", transform: "scale(1.01)" }}
            transition={"0.1s ease-in-out"}
            cursor={"pointer"}
            onClick={openSongOverlay}
            onMouseOver={openSongHovering}
            onMouseLeave={closeHovering}
        >
            <Text
                h={`${HU * 0.75}px`}
                w={`${WU * 9.5}px`}
                textAlign={"center"}
                fontWeight={"bold"}
                fontSize={`${HU * 0.6}px`}
                p={0}
                m={0}
            >
                Your Top Songs
            </Text>
            {loaded ? (
                <Flex
                    flexDir={"column"}
                    justifyContent={"center"}
                    h={`${HU * 8.5}px`}
                    w={`${WU * 9.5}px`}
                >
                    <Flex
                        flexDir={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        h={`${HU * 8.5}px`}
                        w={`${WU * 9.5}px`}
                    >
                        {songs.slice(0, 5).map((song, i) => (
                            <Flex
                                flexDir={"row"}
                                key={`${song.name}_preview`}
                                mx={`${WU * 0.25}px`}
                                my={`${HU * 0.05}px`}
                                h={`${HU * 1.5}px`}
                                w={`${WU * 9}px`}
                            >
                                <Flex alignItems={"center"}>
                                    <Image
                                        src={
                                            song.album.images[0].url ??
                                            "/unknown.png"
                                        }
                                        alt={`${song.name} album art`}
                                        width={
                                            song.album.images[0].width *
                                            WU *
                                            1.4
                                        }
                                        height={
                                            song.album.images[0].width *
                                            WU *
                                            1.4
                                        }
                                    />
                                </Flex>

                                <Flex flexDir={"column"} ml={2}>
                                    <Text
                                        fontSize={
                                            song.name.length < 35
                                                ? `${HU * 0.35}px`
                                                : `${HU * 0.3}px`
                                        }
                                    >
                                        {`${i + 1}. ${song.name}`.substring(
                                            0,
                                            45
                                        )}
                                    </Text>
                                    <Text fontSize={`${HU * 0.3}px`}>
                                        {song.artists
                                            .map((artist) => artist.name)
                                            .join(", ")}
                                    </Text>
                                    <Text
                                        fontSize={
                                            song.album.name.length < 35
                                                ? `${HU * 0.3}px`
                                                : `${HU * 0.25}px`
                                        }
                                        color={"whiteAlpha.500"}
                                    >
                                        {song.album.name}
                                    </Text>
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            ) : (
                <Text fontSize={`${HU * 0.4}px`}>Loading...</Text>
            )}
            <Text
                h={`${HU * 0.32}px`}
                w={`${WU * 9}px`}
                fontSize={`${HU * 0.32}px`}
                fontWeight={"semibold"}
                color={"whiteAlpha.500"}
                textAlign={"center"}
                mb={2}
            >
                Click for more info
            </Text>
        </Flex>
    );
}
