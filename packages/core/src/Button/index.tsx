import React from 'react';
import styled from 'styled-components';

interface BlockPathProps {
    x?: number;
    y?: number;
    width: number;
    height: number;
    d: number;
}

function BlockPath({x = 0, y = 0, width, height, d, ...props}: BlockPathProps) {
    return (
        <path
            d={`M ${x} ${y + d} L ${x + d} ${y} L ${x + width - d} ${y} L ${x + width} ${y + d} L ${x + width} ${y + height - d} L ${x + width - d} ${y + height} L ${x + d} ${y + height} L ${x} ${y + height - d} L ${x} ${y + d}Z`}
            style={{
                fill: '#ff0000',
                stroke: 'none'
            }}
            {...props}
        />
    );
}

function ButtonOuterPath({x = 0, y = 0, width, height, d, ...props}: BlockPathProps) {
    type XYPair = [number, number];
    const line2curve: XYPair[] = [
        [0, d],
        [d, 0],
        [height - d, 0],
        [height - d / 2, d / 2],
        [width - height, d / 2],
        [width - height + d / 2, 0],
        [width - d, 0],
        [width, d],
        [width, height - d],
        [width - d, height],
        [width - height + d / 2, height],
        [width - height, height - d / 2],
        [height - d / 2, height - d / 2],
        [height - d, height],
        [d, height],
        [0, height - d],
    ]

    const [M, ...lines] = line2curve;
    const [Mx, My] = M;
    console.log(line2curve);

    return (
        <path
            d={`M ${x + Mx} ${y + My} ${lines.map(([Lx,Ly]) => ` L ${x + Lx} ${y + Ly}`).join('')}Z`}
            style={{
                fill: '#ff0000',
                stroke: 'none'
            }}
            {...props}
        />
    );
}

export interface ButtonProps {
    width?: number;
    height?: number;
    text: string;
}

export function Button({width = 300, text}: ButtonProps) {
    const width = 300;
    return (
        <div>
            <svg width={width} height="200">
                <defs>
                    <linearGradient id="lgrad" x1="50%" y1="100%" x2="50%" y2="0%" >
                        <stop offset="0%" style={{stopColor: 'rgb(160,92,6)', stopOpacity: 1}} />
                        <stop offset="50%" style={{stopColor: 'rgb(78,35,9)', stopOpacity: 1}} />
                        <stop offset="75%" style={{stopColor: 'rgb(33,17,5)', stopOpacity: 1}} />
                    </linearGradient>
                    <radialGradient id="rgrad" cx="50%" cy="85%" r="70%" >
                        <stop offset="0%" style={{stopColor: 'rgb(78,35,9)', stopOpacity: 0}} />
                        <stop offset="100%" style={{stopColor: 'rgb(33,17,5)', stopOpacity: 0.7}} />
                    </radialGradient>
                    <filter id="f3" x="0" y="0" width="150%" height="150%">
                        <feOffset result="offOut" in="SourceAlpha" dx="1" dy="1" />
                        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                </defs>
                <g id="layer1">
                    <ButtonOuterPath width={width} height={60} d={10} style={{
                        fill: 'rgba(58, 33, 17, 50)'
                    }}/>
                    <BlockPath x={7} y={7} width={width - 7 * 2} height={60 - 7 * 2} d={8} style={{
                        fill: 'url(#lgrad)',
                        stroke: 'rgb(255, 224, 133)',
                        strokeWidth: 2
                    }}/>
                    <BlockPath x={7} y={7} width={width - 7 * 2} height={60 - 7 * 2} d={8} style={{
                        fill: 'url(#rgrad)',
                        stroke: 'none'
                    }}/>
                    <text 
                        filter="url(#f3)" 
                        x={width / 3} 
                        y={36} 
                        font-size="1em"
                        style={{fill: 'rgb(255, 224, 133)'}}>{text}</text>
                </g>
            </svg>
        </div>
    )
}
