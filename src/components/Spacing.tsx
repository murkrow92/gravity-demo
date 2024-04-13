import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type Size = 4 | 6 | 8 | 12 | 16 | 24 | 32;

type Direction = 'vertical' | 'horizontal';

interface Props {
    size: Size;
    direction: Direction;
    backgroundColor?: string;
}

const Spacing: React.FC<Props> = ({
    size,
    backgroundColor = 'transparent',
    direction = 'vertical',
}) => {
    const isVertical = direction === 'vertical';
    const spacingStyle: StyleProp<ViewStyle> = {
        height: isVertical ? size : undefined,
        width: !isVertical ? size : undefined,
        backgroundColor,
    };

    return <View style={spacingStyle} />;
};

export default Spacing;
