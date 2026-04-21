/**
 * Docs-only CommonJS shim for `react-native-svg` (same idea as react-native-svg-web).
 * Next.js Pages Router externalizes many node_modules on the server; a bare `import`
 * from `@my-ui-lib/core` would otherwise resolve the real package and crash SSR.
 *
 * License: MIT — derived from https://github.com/bakerface/react-native-svg-web
 */
'use strict';

const React = require('react');
const ReactNativeWeb = require('react-native-web');
const PropTypes = require('prop-types');

const createReactElement =
  ReactNativeWeb.unstable_createElement || React.createElement;

function createElement(name, type) {
  class CreateElement extends React.Component {
    render() {
      return createReactElement(type, this.props, this.props.children);
    }
  }

  CreateElement.displayName = name;
  CreateElement.propTypes = { children: PropTypes.node };
  CreateElement.defaultProps = { children: undefined };
  return CreateElement;
}

const Svg = createElement('Svg', 'svg');
Svg.Svg = Svg;

const Circle = createElement('Circle', 'circle');
Svg.Circle = Circle;
const ClipPath = createElement('ClipPath', 'clipPath');
Svg.ClipPath = ClipPath;
const Defs = createElement('Defs', 'defs');
Svg.Defs = Defs;
const Ellipse = createElement('Ellipse', 'ellipse');
Svg.Ellipse = Ellipse;
const ForeignObject = createElement('ForeignObject', 'foreignObject');
Svg.ForeignObject = ForeignObject;
const G = createElement('G', 'g');
Svg.G = G;
const Image = createElement('Image', 'image');
Svg.Image = Image;
const Line = createElement('Line', 'line');
Svg.Line = Line;
const LinearGradient = createElement('LinearGradient', 'linearGradient');
Svg.LinearGradient = LinearGradient;
const Marker = createElement('Marker', 'marker');
Svg.Marker = Marker;
const Mask = createElement('Mask', 'mask');
Svg.Mask = Mask;
const Path = createElement('Path', 'path');
Svg.Path = Path;
const Pattern = createElement('Pattern', 'pattern');
Svg.Pattern = Pattern;
const Polygon = createElement('Polygon', 'polygon');
Svg.Polygon = Polygon;
const Polyline = createElement('Polyline', 'polyline');
Svg.Polyline = Polyline;
const RadialGradient = createElement('RadialGradient', 'radialGradient');
Svg.RadialGradient = RadialGradient;
const Rect = createElement('Rect', 'rect');
Svg.Rect = Rect;
const Stop = createElement('Stop', 'stop');
Svg.Stop = Stop;
const Symbol = createElement('Symbol', 'symbol');
Svg.Symbol = Symbol;
const Text = createElement('Text', 'text');
Svg.Text = Text;
const TextPath = createElement('TextPath', 'textPath');
Svg.TextPath = TextPath;
const TSpan = createElement('TSpan', 'tspan');
Svg.TSpan = TSpan;
const Use = createElement('Use', 'use');
Svg.Use = Use;

module.exports = Svg;
module.exports.default = Svg;
module.exports.Svg = Svg;
module.exports.Circle = Circle;
module.exports.ClipPath = ClipPath;
module.exports.Defs = Defs;
module.exports.Ellipse = Ellipse;
module.exports.ForeignObject = ForeignObject;
module.exports.G = G;
module.exports.Image = Image;
module.exports.Line = Line;
module.exports.LinearGradient = LinearGradient;
module.exports.Marker = Marker;
module.exports.Mask = Mask;
module.exports.Path = Path;
module.exports.Pattern = Pattern;
module.exports.Polygon = Polygon;
module.exports.Polyline = Polyline;
module.exports.RadialGradient = RadialGradient;
module.exports.Rect = Rect;
module.exports.Stop = Stop;
module.exports.Symbol = Symbol;
module.exports.Text = Text;
module.exports.TextPath = TextPath;
module.exports.TSpan = TSpan;
module.exports.Use = Use;
