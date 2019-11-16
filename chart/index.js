const F2 = require('@antv/f2/lib/core');
require('@antv/f2/lib/geom/');
require('@antv/f2/lib/geom/adjust/');
require('@antv/f2/lib/scale/time-cat');
const Animation = require('@antv/f2/lib/animation/detail');
F2.Chart.plugins.register(Animation); // Global registration，you can also just register it
require('@antv/f2/lib/component/guide');
const Guide = require('@antv/f2/lib/plugin/guide');
F2.Chart.plugins.register(Guide);
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
// Step 2：register Tooltip
F2.Chart.plugins.register(Tooltip); // Global registration，you can also just register it
const Legend = require('@antv/f2/lib/plugin/legend');
// Step 2: register Legend
F2.Chart.plugins.register(Legend); // Global registration，you can also just register it
require('@antv/f2/lib/interaction/');
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');
F2.Chart.plugins.register(ScrollBar);

window.F2 = F2;