jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.callNative = () => {};
  return Reanimated;
});

jest.mock('react-native-svg', () => {
  const React = require('react');
  const {View} = require('react-native');

  function createSvgMock(displayName) {
    const C = React.forwardRef((props, ref) =>
      React.createElement(View, {
        ref,
        collapsable: false,
        testID: `svg-mock-${displayName}`,
      }),
    );
    C.displayName = displayName;
    return C;
  }

  return {
    __esModule: true,
    default: createSvgMock('Svg'),
    Svg: createSvgMock('Svg'),
    Circle: createSvgMock('Circle'),
    Ellipse: createSvgMock('Ellipse'),
    G: createSvgMock('G'),
    Text: createSvgMock('Text'),
    TSpan: createSvgMock('TSpan'),
    TextPath: createSvgMock('TextPath'),
    Path: createSvgMock('Path'),
    Polygon: createSvgMock('Polygon'),
    Polyline: createSvgMock('Polyline'),
    Line: createSvgMock('Line'),
    Rect: createSvgMock('Rect'),
    Use: createSvgMock('Use'),
    Image: createSvgMock('Image'),
    Symbol: createSvgMock('Symbol'),
    Defs: createSvgMock('Defs'),
    LinearGradient: createSvgMock('LinearGradient'),
    RadialGradient: createSvgMock('RadialGradient'),
    Stop: createSvgMock('Stop'),
    ClipPath: createSvgMock('ClipPath'),
    Pattern: createSvgMock('Pattern'),
    Mask: createSvgMock('Mask'),
    Marker: createSvgMock('Marker'),
    ForeignObject: createSvgMock('ForeignObject'),
  };
});
