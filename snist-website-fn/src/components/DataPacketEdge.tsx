import React, { memo } from 'react';
import { BaseEdge, EdgeProps, getSmoothStepPath } from 'reactflow';

const DataPacketEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) => {
    const [edgePath] = getSmoothStepPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            {/* Base Static Line (Subtle Gray) */}
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, stroke: '#333', strokeWidth: 2 }} />

            {/* Moving Data Packet (SVG Circle following the path) */}
            <circle r="4" fill="#06b6d4">
                <animateMotion dur="2s" repeatCount="indefinite" path={edgePath}>
                    <mpath href={`#${id}`} />
                </animateMotion>
            </circle>

            {/* Glow Effect for the packet */}
            <circle r="8" fill="#06b6d4" opacity="0.4">
                <animateMotion dur="2s" repeatCount="indefinite" path={edgePath}>
                    <mpath href={`#${id}`} />
                </animateMotion>
            </circle>
        </>
    );
};

export default memo(DataPacketEdge);
