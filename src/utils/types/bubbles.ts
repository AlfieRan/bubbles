import { artistType } from "./spotify";

export interface bubblePosType {
    x: number;
    y: number;
}

export interface dimensionType {
    width: number;
    height: number;
}

export interface artistBubbleContextType {
    type: "artist";
    artist: artistType;
}

export interface profileBubbleContextType {
    type: "profile";
}

export interface nicheBubbleContextType {
    type: "niche";
}

export type bubblePhysicsType = {
    pos: bubblePosType;
    dimensions: dimensionType;
    points: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    area: number;
};

export type bubbleType = {
    details:
        | artistBubbleContextType
        | profileBubbleContextType
        | nicheBubbleContextType;
    physics: bubblePhysicsType;
};

export type bubbleContextType =
    | artistBubbleContextType
    | profileBubbleContextType
    | nicheBubbleContextType;
