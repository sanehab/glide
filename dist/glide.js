/*!
 * Glide.js v3.3.0
 * (c) 2013-2019 Jędrzej Chałubek <jedrzej.chalubek@gmail.com> (http://jedrzejchalubek.com/)
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Glide = factory());
}(this, (function () { 'use strict';

  var defaults = {
    /**
     * Type of the movement.
     *
     * Available types:
     * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
     * `carousel` - Changes slides without starting over when it reaches the first or last slide.
     *
     * @type {String}
     */
    type: 'slider',

    /**
     * Start at specific slide number defined with zero-based index.
     *
     * @type {Number}
     */
    startAt: 0,

    /**
     * A number of slides visible on the single viewport.
     *
     * @type {Number}
     */
    perView: 1,

    /**
     * Focus currently active slide at a specified position in the track.
     *
     * Available inputs:
     * `center` - Current slide will be always focused at the center of a track.
     * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
     *
     * @type {String|Number}
     */
    focusAt: 0,

    /**
     * A size of the gap added between slides.
     *
     * @type {Number}
     */
    gap: 10,

    /**
     * Change slides after a specified interval. Use `false` for turning off autoplay.
     *
     * @type {Number|Boolean}
     */
    autoplay: false,

    /**
     * Stop autoplay on mouseover event.
     *
     * @type {Boolean}
     */
    hoverpause: true,

    /**
     * Allow for changing slides with left and right keyboard arrows.
     *
     * @type {Boolean}
     */
    keyboard: true,

    /**
     * Stop running `perView` number of slides from the end. Use this
     * option if you don't want to have an empty space after
     * a slider. Works only with `slider` type and a
     * non-centered `focusAt` setting.
     *
     * @type {Boolean}
     */
    bound: false,

    /**
     * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
     *
     * @type {Number|Boolean}
     */
    swipeThreshold: 80,

    /**
     * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
     *
     * @type {Number|Boolean}
     */
    dragThreshold: 120,

    /**
     * A maximum number of slides to which movement will be made on swiping or dragging. Use `false` for unlimited.
     *
     * @type {Number|Boolean}
     */
    perTouch: false,

    /**
     * Moving distance ratio of the slides on a swiping and dragging.
     *
     * @type {Number}
     */
    touchRatio: 0.5,

    /**
     * Angle required to activate slides moving on swiping or dragging.
     *
     * @type {Number}
     */
    touchAngle: 45,

    /**
     * Duration of the animation in milliseconds.
     *
     * @type {Number}
     */
    animationDuration: 400,

    /**
     * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
     *
     * @type {Boolean}
     */
    rewind: true,

    /**
     * Duration of the rewinding animation of the `slider` type in milliseconds.
     *
     * @type {Number}
     */
    rewindDuration: 800,

    /**
     * Easing function for the animation.
     *
     * @type {String}
     */
    animationTimingFunc: 'cubic-bezier(.165, .840, .440, 1)',

    /**
     * Wait for the animation to finish until the next user input can be processed
     *
     * @type {boolean}
     */
    waitForTransition: true,

    /**
     * Throttle costly events at most once per every wait milliseconds.
     *
     * @type {Number}
     */
    throttle: 10,

    /**
     * Moving direction mode.
     *
     * Available inputs:
     * - 'ltr' - left to right movement,
     * - 'rtl' - right to left movement.
     *
     * @type {String}
     */
    direction: 'ltr',

    /**
     * The distance value of the next and previous viewports which
     * have to peek in the current view. Accepts number and
     * pixels as a string. Left and right peeking can be
     * set up separately with a directions object.
     *
     * For example:
     * `100` - Peek 100px on the both sides.
     * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
     *
     * @type {Number|String|Object}
     */
    peek: 0,

    /**
     * Collection of options applied at specified media breakpoints.
     * For example: display two slides per view under 800px.
     * `{
     *   '800px': {
     *     perView: 2
     *   }
     * }`
     */
    breakpoints: {},

    /**
     * Collection of internally used HTML classes.
     *
     * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
     * @type {Object}
     */
    classes: {
      direction: {
        ltr: 'glide--ltr',
        rtl: 'glide--rtl'
      },
      slider: 'glide--slider',
      carousel: 'glide--carousel',
      swipeable: 'glide--swipeable',
      dragging: 'glide--dragging',
      cloneSlide: 'glide__slide--clone',
      activeNav: 'glide__bullet--active',
      activeSlide: 'glide__slide--active',
      disabledArrow: 'glide__arrow--disabled'
    }
  };

  /**
   * Outputs warning message to the bowser console.
   *
   * @param  {String} msg
   * @return {Void}
   */
  function warn(msg) {
    console.error("[Glide warn]: " + msg);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /**
   * Converts value entered as number
   * or string to integer value.
   *
   * @param {String} value
   * @returns {Number}
   */
  function toInt(value) {
    return parseInt(value);
  }

  /**
   * Converts value entered as number
   * or string to flat value.
   *
   * @param {String} value
   * @returns {Number}
   */
  function toFloat(value) {
    return parseFloat(value);
  }

  /**
   * Indicates whether the specified value is a string.
   *
   * @param  {*}   value
   * @return {Boolean}
   */
  function isString(value) {
    return typeof value === 'string';
  }

  /**
   * Indicates whether the specified value is an object.
   *
   * @param  {*} value
   * @return {Boolean}
   *
   * @see https://github.com/jashkenas/underscore
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

    return type === 'function' || type === 'object' && !!value; // eslint-disable-line no-mixed-operators
  }

  /**
   * Indicates whether the specified value is a number.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isNumber(value) {
    return typeof value === 'number';
  }

  /**
   * Indicates whether the specified value is a function.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isFunction(value) {
    return typeof value === 'function';
  }

  /**
   * Indicates whether the specified value is undefined.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * Indicates whether the specified value is an array.
   *
   * @param  {*} value
   * @return {Boolean}
   */
  function isArray(value) {
    return value.constructor === Array;
  }

  /**
   * Creates and initializes specified collection of extensions.
   * Each extension receives access to instance of glide and rest of components.
   *
   * @param {Object} glide
   * @param {Object} extensions
   *
   * @returns {Object}
   */
  function mount(glide, extensions, events) {
    var components = {};

    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn('Extension must be a function');
      }
    }

    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }

    return components;
  }

  /**
   * Defines getter and setter property on the specified object.
   *
   * @param  {Object} obj         Object where property has to be defined.
   * @param  {String} prop        Name of the defined property.
   * @param  {Object} definition  Get and set definitions for the property.
   * @return {Void}
   */
  function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }

  /**
   * Sorts aphabetically object keys.
   *
   * @param  {Object} obj
   * @return {Object}
   */
  function sortKeys(obj) {
    return Object.keys(obj).sort().reduce(function (r, k) {
      r[k] = obj[k];

      return r[k], r;
    }, {});
  }

  /**
   * Merges passed settings object with default options.
   *
   * @param  {Object} defaults
   * @param  {Object} settings
   * @return {Object}
   */
  function mergeOptions(defaults, settings) {
    var options = _extends({}, defaults, settings);

    // `Object.assign` do not deeply merge objects, so we
    // have to do it manually for every nested object
    // in options. Although it does not look smart,
    // it's smaller and faster than some fancy
    // merging deep-merge algorithm script.
    if (settings.hasOwnProperty('classes')) {
      options.classes = _extends({}, defaults.classes, settings.classes);

      if (settings.classes.hasOwnProperty('direction')) {
        options.classes.direction = _extends({}, defaults.classes.direction, settings.classes.direction);
      }
    }

    if (settings.hasOwnProperty('breakpoints')) {
      options.breakpoints = _extends({}, defaults.breakpoints, settings.breakpoints);
    }

    return options;
  }

  var EventsBus = function () {
    /**
     * Construct a EventBus instance.
     *
     * @param {Object} events
     */
    function EventsBus() {
      var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBus);

      this.events = events;
      this.hop = events.hasOwnProperty;
    }

    /**
     * Adds listener to the specifed event.
     *
     * @param {String|Array} event
     * @param {Function} handler
     */


    createClass(EventsBus, [{
      key: 'on',
      value: function on(event, handler) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.on(event[i], handler);
          }
        }

        // Create the event's object if not yet created
        if (!this.hop.call(this.events, event)) {
          this.events[event] = [];
        }

        // Add the handler to queue
        var index = this.events[event].push(handler) - 1;

        // Provide handle back for removal of event
        return {
          remove: function remove() {
            delete this.events[event][index];
          }
        };
      }

      /**
       * Runs registered handlers for specified event.
       *
       * @param {String|Array} event
       * @param {Object=} context
       */

    }, {
      key: 'emit',
      value: function emit(event, context) {
        if (isArray(event)) {
          for (var i = 0; i < event.length; i++) {
            this.emit(event[i], context);
          }
        }

        // If the event doesn't exist, or there's no handlers in queue, just leave
        if (!this.hop.call(this.events, event)) {
          return;
        }

        // Cycle through events queue, fire!
        this.events[event].forEach(function (item) {
          item(context || {});
        });
      }
    }]);
    return EventsBus;
  }();

  var Glide = function () {
    /**
     * Construct glide.
     *
     * @param  {String} selector
     * @param  {Object} options
     */
    function Glide(selector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Glide);

      this._c = {};
      this._t = [];
      this._e = new EventsBus();

      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }

    /**
     * Initializes glide.
     *
     * @param {Object} extensions Collection of extensions to initialize.
     * @return {Glide}
     */


    createClass(Glide, [{
      key: 'mount',
      value: function mount$$1() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this._e.emit('mount.before');

        if (isObject(extensions)) {
          this._c = mount(this, extensions, this._e);
        } else {
          warn('You need to provide a object on `mount()`');
        }

        this._e.emit('mount.after');

        return this;
      }

      /**
       * Collects an instance `translate` transformers.
       *
       * @param  {Array} transformers Collection of transformers.
       * @return {Void}
       */

    }, {
      key: 'mutate',
      value: function mutate() {
        var transformers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (isArray(transformers)) {
          this._t = transformers;
        } else {
          warn('You need to provide a array on `mutate()`');
        }

        return this;
      }

      /**
       * Updates glide with specified settings.
       *
       * @param {Object} settings
       * @return {Glide}
       */

    }, {
      key: 'update',
      value: function update() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        this.settings = mergeOptions(this.settings, settings);

        if (settings.hasOwnProperty('startAt')) {
          this.index = settings.startAt;
        }

        this._e.emit('update');

        return this;
      }

      /**
       * Change slide with specified pattern. A pattern must be in the special format:
       * `>` - Move one forward
       * `<` - Move one backward
       * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
       * `>>` - Rewinds to end (last slide)
       * `<<` - Rewinds to start (first slide)
       *
       * @param {String} pattern
       * @return {Glide}
       */

    }, {
      key: 'go',
      value: function go(pattern) {
        this._c.Run.make(pattern);

        return this;
      }

      /**
       * Move track by specified distance.
       *
       * @param {String} distance
       * @return {Glide}
       */

    }, {
      key: 'move',
      value: function move(distance) {
        this._c.Transition.disable();
        this._c.Move.make(distance);

        return this;
      }

      /**
       * Destroy instance and revert all changes done by this._c.
       *
       * @return {Glide}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        this._e.emit('destroy');

        return this;
      }

      /**
       * Start instance autoplaying.
       *
       * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Glide}
       */

    }, {
      key: 'play',
      value: function play() {
        var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (interval) {
          this.settings.autoplay = interval;
        }

        this._e.emit('play');

        return this;
      }

      /**
       * Stop instance autoplaying.
       *
       * @return {Glide}
       */

    }, {
      key: 'pause',
      value: function pause() {
        this._e.emit('pause');

        return this;
      }

      /**
       * Sets glide into a idle status.
       *
       * @return {Glide}
       */

    }, {
      key: 'disable',
      value: function disable() {
        this.disabled = true;

        return this;
      }

      /**
       * Sets glide into a active status.
       *
       * @return {Glide}
       */

    }, {
      key: 'enable',
      value: function enable() {
        this.disabled = false;

        return this;
      }

      /**
       * Adds cuutom event listener with handler.
       *
       * @param  {String|Array} event
       * @param  {Function} handler
       * @return {Glide}
       */

    }, {
      key: 'on',
      value: function on(event, handler) {
        this._e.on(event, handler);

        return this;
      }

      /**
       * Checks if glide is a precised type.
       *
       * @param  {String} name
       * @return {Boolean}
       */

    }, {
      key: 'isType',
      value: function isType(name) {
        return this.settings.type === name;
      }

      /**
       * Gets value of the core options.
       *
       * @return {Object}
       */

    }, {
      key: 'settings',
      get: function get$$1() {
        return this._o;
      }

      /**
       * Sets value of the core options.
       *
       * @param  {Object} o
       * @return {Void}
       */
      ,
      set: function set$$1(o) {
        if (isObject(o)) {
          this._o = o;
        } else {
          warn('Options must be an `object` instance.');
        }
      }

      /**
       * Gets current index of the slider.
       *
       * @return {Object}
       */

    }, {
      key: 'index',
      get: function get$$1() {
        return this._i;
      }

      /**
       * Sets current index a slider.
       *
       * @return {Object}
       */
      ,
      set: function set$$1(i) {
        this._i = toInt(i);
      }

      /**
       * Gets type name of the slider.
       *
       * @return {String}
       */

    }, {
      key: 'type',
      get: function get$$1() {
        return this.settings.type;
      }

      /**
       * Gets value of the idle status.
       *
       * @return {Boolean}
       */

    }, {
      key: 'disabled',
      get: function get$$1() {
        return this._d;
      }

      /**
       * Sets value of the idle status.
       *
       * @return {Boolean}
       */
      ,
      set: function set$$1(status) {
        this._d = !!status;
      }
    }]);
    return Glide;
  }();

  function Run (Glide, Components, Events) {
    var Run = {
      /**
       * Initializes autorunning of the glide.
       *
       * @return {Void}
       */
      mount: function mount() {
        this._o = false;
      },


      /**
       * Makes glides running based on the passed moving schema.
       *
       * @param {String} move
       */
      make: function make(move) {
        var _this = this;

        if (!Glide.disabled) {
          !Glide.settings.waitForTransition || Glide.disable();

          this.move = move;

          Events.emit('run.before', this.move);

          this.calculate();

          Events.emit('run', this.move);

          Components.Transition.after(function () {
            if (_this.isStart()) {
              Events.emit('run.start', _this.move);
            }

            if (_this.isEnd()) {
              Events.emit('run.end', _this.move);
            }

            if (_this.isOffset()) {
              _this._o = false;

              Events.emit('run.offset', _this.move);
            }

            Events.emit('run.after', _this.move);

            Glide.enable();
          });
        }
      },


      /**
       * Calculates current index based on defined move.
       *
       * @return {Number|Undefined}
       */
      calculate: function calculate() {
        var move = this.move,
            length = this.length;
        var steps = move.steps,
            direction = move.direction;

        // By default assume that size of view is equal to one slide

        var viewSize = 1;
        // Determine if steps are numeric value
        var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;

        // While direction is `=` we want jump to
        // a specified index described in steps.
        if (direction === '=') {
          Glide.index = steps;

          return;
        }

        // When pattern is equal to `>>` we want
        // fast forward to the last slide.
        if (direction === '>' && steps === '>') {
          Glide.index = length;

          return;
        }

        // When pattern is equal to `<<` we want
        // fast forward to the first slide.
        if (direction === '<' && steps === '<') {
          Glide.index = 0;

          return;
        }

        // While steps is a numeric value and we
        // move forward by the number of steps.
        if (direction === '>' && countableSteps) {
          viewSize = toInt(steps) * -1;
        }

        // $steps< (drag) movement
        if (direction === '<' && countableSteps) {
          viewSize = toInt(steps);
        }

        // pagination movement
        if (direction === '|') {
          viewSize = Glide.settings.perView || 1;
        }

        // we are moving forward
        if (direction === '>' || direction === '|' && steps === '>') {
          var index = calculateForwardIndex(viewSize);

          if (index > length) {
            this._o = true;
          }

          Glide.index = normalizeForwardIndex(index, viewSize);

          return;
        }

        // we are moving backward
        if (direction === '<' || direction === '|' && steps === '<') {
          var _index = calculateBackwardIndex(viewSize);

          if (_index < 0) {
            this._o = true;
          }

          Glide.index = normalizeBackwardIndex(_index, viewSize);

          return;
        }

        warn('Invalid direction pattern [' + direction + steps + '] has been used');
      },


      /**
       * Checks if we are on the first slide.
       *
       * @return {Boolean}
       */
      isStart: function isStart() {
        return Glide.index <= 0;
      },


      /**
       * Checks if we are on the last slide.
       *
       * @return {Boolean}
       */
      isEnd: function isEnd() {
        return Glide.index >= this.length;
      },


      /**
       * Checks if we are making a offset run.
       *
       * @param {String} direction
       * @return {Boolean}
       */
      isOffset: function isOffset() {
        var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        if (!direction) {
          return this._o;
        }

        if (!this._o) {
          return false;
        }

        // did we view to the right?
        if (direction === '|>') {
          return this.move.direction === '|' && this.move.steps === '>';
        }

        // did we view to the left?
        if (direction === '|<') {
          return this.move.direction === '|' && this.move.steps === '<';
        }

        return this.move.direction === direction;
      },


      /**
       * Checks if bound mode is active
       *
       * @return {Boolean}
       */
      isBound: function isBound() {
        return Glide.isType('slider') && Glide.settings.focusAt !== 'center' && Glide.settings.bound;
      }
    };

    /**
     * Returns index value to move forward/to the right
     *
     * @param viewSize
     * @returns {Number}
     */
    function calculateForwardIndex(viewSize) {
      var index = Glide.index;


      if (Glide.isType('carousel')) {
        return index + viewSize;
      }

      return index + (viewSize - index % viewSize);
    }

    /**
     * Normalizes the given forward index based on glide settings, preventing it to exceed certain boundaries
     *
     * @param index
     * @param length
     * @param viewSize
     * @returns {Number}
     */
    function normalizeForwardIndex(index, viewSize) {
      var length = Run.length;


      if (index <= length) {
        return index;
      }

      if (Glide.isType('carousel')) {
        return index - (length + 1);
      }

      if (Glide.settings.rewind) {
        // bound does funny things with the length, therefor we have to be certain
        // that we are on the last possible index value given by bound
        if (Run.isBound() && !Run.isEnd()) {
          return length;
        }

        return 0;
      }

      if (Run.isBound()) {
        return length;
      }

      return Math.floor(length / viewSize) * viewSize;
    }

    /**
     * Calculates index value to move backward/to the left
     *
     * @param viewSize
     * @returns {Number}
     */
    function calculateBackwardIndex(viewSize) {
      var index = Glide.index;


      if (Glide.isType('carousel')) {
        return index - viewSize;
      }

      // ensure our back navigation results in the same index as a forward navigation
      // to experience a homogeneous paging
      var view = Math.ceil(index / viewSize);

      return (view - 1) * viewSize;
    }

    /**
     * Normalizes the given backward index based on glide settings, preventing it to exceed certain boundaries
     *
     * @param index
     * @param length
     * @param viewSize
     * @returns {*}
     */
    function normalizeBackwardIndex(index, viewSize) {
      var length = Run.length;


      if (index >= 0) {
        return index;
      }

      if (Glide.isType('carousel')) {
        return index + (length + 1);
      }

      if (Glide.settings.rewind) {
        // bound does funny things with the length, therefor we have to be certain
        // that we are on first possible index value before we to rewind to the length given by bound
        if (Run.isBound() && Run.isStart()) {
          return length;
        }

        return Math.floor(length / viewSize) * viewSize;
      }

      return 0;
    }

    define(Run, 'move', {
      /**
       * Gets value of the move schema.
       *
       * @returns {Object}
       */
      get: function get() {
        return this._m;
      },


      /**
       * Sets value of the move schema.
       *
       * @returns {Object}
       */
      set: function set(value) {
        var step = value.substr(1);

        this._m = {
          direction: value.substr(0, 1),
          steps: step ? toInt(step) ? toInt(step) : step : 0
        };
      }
    });

    define(Run, 'length', {
      /**
       * Gets value of the running distance based
       * on zero-indexing number of slides.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;
        var length = Components.Html.slides.length;

        // If the `bound` option is active, a maximum running distance should be
        // reduced by `perView` and `focusAt` settings. Running distance
        // should end before creating an empty space after instance.

        if (this.isBound()) {
          return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
        }

        return length - 1;
      }
    });

    define(Run, 'offset', {
      /**
       * Gets status of the offsetting flag.
       *
       * @return {Boolean}
       */
      get: function get() {
        return this._o;
      }
    });

    return Run;
  }

  /**
   * Returns a current time.
   *
   * @return {Number}
   */
  function now() {
    return new Date().getTime();
  }

  /**
   * Returns a function, that, when invoked, will only be triggered
   * at most once during a given window of time.
   *
   * @param {Function} func
   * @param {Number} wait
   * @param {Object=} options
   * @return {Function}
   *
   * @see https://github.com/jashkenas/underscore
   */
  function throttle(func, wait, options) {
    var timeout = void 0,
        context = void 0,
        args = void 0,
        result = void 0;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
      var at = now();
      if (!previous && options.leading === false) previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = at;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }

  var MARGIN_TYPE = {
    ltr: ['marginLeft', 'marginRight'],
    rtl: ['marginRight', 'marginLeft']
  };

  function Gaps (Glide, Components, Events) {
    var Gaps = {
      /**
       * Applies gaps between slides. First and last
       * slides do not receive it's edge margins.
       *
       * @param {HTMLCollection} slides
       * @return {Void}
       */
      apply: function apply(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          var direction = Components.Direction.value;

          if (i !== 0) {
            style[MARGIN_TYPE[direction][0]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][0]] = '';
          }

          if (i !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = this.value / 2 + 'px';
          } else {
            style[MARGIN_TYPE[direction][1]] = '';
          }
        }
      },


      /**
       * Removes gaps from the slides.
       *
       * @param {HTMLCollection} slides
       * @returns {Void}
      */
      remove: function remove(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;

          style.marginLeft = '';
          style.marginRight = '';
        }
      }
    };

    define(Gaps, 'value', {
      /**
       * Gets value of the gap.
       *
       * @returns {Number}
       */
      get: function get() {
        return toInt(Glide.settings.gap);
      }
    });

    define(Gaps, 'grow', {
      /**
       * Gets additional dimentions value caused by gaps.
       * Used to increase width of the slides wrapper.
       *
       * @returns {Number}
       */
      get: function get() {
        return Gaps.value * Components.Sizes.length;
      }
    });

    define(Gaps, 'reductor', {
      /**
       * Gets reduction value caused by gaps.
       * Used to subtract width of the slides.
       *
       * @returns {Number}
       */
      get: function get() {
        var perView = Glide.settings.perView;

        return Gaps.value * (perView - 1) / perView;
      }
    });

    /**
     * Apply calculated gaps:
     * - after building, so slides (including clones) will receive proper margins
     * - on updating via API, to recalculate gaps with new options
     */
    Events.on(['build.after', 'update'], throttle(function () {
      Gaps.apply(Components.Html.wrapper.children);
    }, 30));

    /**
     * Remove gaps:
     * - on destroying to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Gaps.remove(Components.Html.wrapper.children);
    });

    return Gaps;
  }

  /**
   * Finds siblings nodes of the passed node.
   *
   * @param  {Element} node
   * @return {Array}
   */
  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];

      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }

      return matched;
    }

    return [];
  }

  /**
   * Checks if passed node exist and is a valid element.
   *
   * @param  {Element} node
   * @return {Boolean}
   */
  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }

    return false;
  }

  var TRACK_SELECTOR = '[data-glide-el="track"]';

  function Html (Glide, Components) {
    var Html = {
      /**
       * Setup slider HTML nodes.
       *
       * @param {Glide} glide
       */
      mount: function mount() {
        this.root = Glide.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = Array.prototype.slice.call(this.wrapper.children).filter(function (slide) {
          return !slide.classList.contains(Glide.settings.classes.cloneSlide);
        });
      }
    };

    define(Html, 'root', {
      /**
       * Gets node of the glide main element.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._r;
      },


      /**
       * Sets node of the glide main element.
       *
       * @return {Object}
       */
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }

        if (exist(r)) {
          Html._r = r;
        } else {
          warn('Root element must be a existing Html node');
        }
      }
    });

    define(Html, 'track', {
      /**
       * Gets node of the glide track with slides.
       *
       * @return {Object}
       */
      get: function get() {
        return Html._t;
      },


      /**
       * Sets node of the glide track with slides.
       *
       * @return {Object}
       */
      set: function set(t) {
        if (exist(t)) {
          Html._t = t;
        } else {
          warn('Could not find track element. Please use ' + TRACK_SELECTOR + ' attribute.');
        }
      }
    });

    define(Html, 'wrapper', {
      /**
       * Gets node of the slides wrapper.
       *
       * @return {Object}
       */
      get: function get() {
        return Html.track.children[0];
      }
    });

    return Html;
  }

  function Peek (Glide, Components, Events) {
    var Peek = {
      /**
       * Setups how much to peek based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.peek;
      }
    };

    define(Peek, 'value', {
      /**
       * Gets value of the peek.
       *
       * @returns {Number|Object}
       */
      get: function get() {
        return Peek._v;
      },


      /**
       * Sets value of the peek.
       *
       * @param {Number|Object} value
       * @return {Void}
       */
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }

        Peek._v = value;
      }
    });

    define(Peek, 'reductor', {
      /**
       * Gets reduction value caused by peek.
       *
       * @returns {Number}
       */
      get: function get() {
        var value = Peek.value;
        var perView = Glide.settings.perView;

        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }

        return value * 2 / perView;
      }
    });

    /**
     * Recalculate peeking sizes on:
     * - when resizing window to update to proper percents
     */
    Events.on(['resize', 'update'], function () {
      Peek.mount();
    });

    return Peek;
  }

  function Move (Glide, Components, Events) {
    var Move = {
      /**
       * Constructs move component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        this._o = 0;
      },


      /**
       * Calculates a movement value based on passed offset and currently active index.
       *
       * @param  {Number} offset
       * @return {Void}
       */
      make: function make() {
        var _this = this;

        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

        this.offset = offset;

        Events.emit('move', {
          movement: this.value
        });

        Components.Transition.after(function () {
          Events.emit('move.after', {
            movement: _this.value
          });
        });
      }
    };

    define(Move, 'offset', {
      /**
       * Gets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      get: function get() {
        return Move._o;
      },


      /**
       * Sets an offset value used to modify current translate.
       *
       * @return {Object}
       */
      set: function set(value) {
        Move._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });

    define(Move, 'translate', {
      /**
       * Gets a raw movement value.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Sizes.slideWidth * Glide.index;
      }
    });

    define(Move, 'value', {
      /**
       * Gets an actual movement value corrected by offset.
       *
       * @return {Number}
       */
      get: function get() {
        var offset = this.offset;
        var translate = this.translate;

        if (Components.Direction.is('rtl')) {
          return translate + offset;
        }

        return translate - offset;
      }
    });

    /**
     * Make movement to proper slide on:
     * - before build, so glide will start at `startAt` index
     * - on each standard run to move to newly calculated index
     */
    Events.on(['build.before', 'run'], function () {
      Move.make();
    });

    return Move;
  }

  function Sizes (Glide, Components, Events) {
    var Sizes = {
      /**
       * Setups dimentions of slides.
       *
       * @return {Void}
       */
      setupSlides: function setupSlides() {
        var width = this.slideWidth + 'px';
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = width;
        }
      },


      /**
       * Setups dimentions of slides wrapper.
       *
       * @return {Void}
       */
      setupWrapper: function setupWrapper() {
        Components.Html.wrapper.style.width = this.wrapperSize + 'px';
      },


      /**
       * Removes applied styles from HTML elements.
       *
       * @returns {Void}
       */
      remove: function remove() {
        var slides = Components.Html.slides;

        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = '';
        }

        Components.Html.wrapper.style.width = '';
      }
    };

    define(Sizes, 'length', {
      /**
       * Gets count number of the slides.
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.slides.length;
      }
    });

    define(Sizes, 'width', {
      /**
       * Gets width value of the slider (visible area).
       *
       * @return {Number}
       */
      get: function get() {
        return Components.Html.root.offsetWidth;
      }
    });

    define(Sizes, 'wrapperSize', {
      /**
       * Gets size of the slides wrapper.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.slideWidth * Sizes.length + Components.Gaps.grow + Components.Clones.grow;
      }
    });

    define(Sizes, 'slideWidth', {
      /**
       * Gets width value of a single slide.
       *
       * @return {Number}
       */
      get: function get() {
        return Sizes.width / Glide.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
      }
    });

    /**
     * Apply calculated glide's dimensions:
     * - before building, so other dimentions (e.g. translate) will be calculated propertly
     * - when resizing window to recalculate sildes dimensions
     * - on updating via API, to calculate dimensions based on new options
     */
    Events.on(['build.before', 'resize', 'update'], function () {
      Sizes.setupSlides();
      Sizes.setupWrapper();
    });

    /**
     * Remove calculated glide's dimensions:
     * - on destoting to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Sizes.remove();
    });

    return Sizes;
  }

  function Build (Glide, Components, Events) {
    var Build = {
      /**
       * Init glide building. Adds classes, sets
       * dimensions and setups initial state.
       *
       * @return {Void}
       */
      mount: function mount() {
        Events.emit('build.before');

        this.typeClass();
        this.activeClass();

        Events.emit('build.after');
      },


      /**
       * Adds `type` class to the glide element.
       *
       * @return {Void}
       */
      typeClass: function typeClass() {
        Components.Html.root.classList.add(Glide.settings.classes[Glide.settings.type]);
      },


      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      activeClass: function activeClass() {
        var classes = Glide.settings.classes;
        var slide = Components.Html.slides[Glide.index];

        if (slide) {
          slide.classList.add(classes.activeSlide);

          siblings(slide).forEach(function (sibling) {
            sibling.classList.remove(classes.activeSlide);
          });
        }
      },


      /**
       * Removes HTML classes applied at building.
       *
       * @return {Void}
       */
      removeClasses: function removeClasses() {
        var classes = Glide.settings.classes;

        Components.Html.root.classList.remove(classes[Glide.settings.type]);

        Components.Html.slides.forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    };

    /**
     * Clear building classes:
     * - on destroying to bring HTML to its initial state
     * - on updating to remove classes before remounting component
     */
    Events.on(['destroy', 'update'], function () {
      Build.removeClasses();
    });

    /**
     * Remount component:
     * - on resizing of the window to calculate new dimentions
     * - on updating settings via API
     */
    Events.on(['resize', 'update'], function () {
      Build.mount();
    });

    /**
     * Swap active class of current slide:
     * - after each move to the new index
     */
    Events.on('move.after', function () {
      Build.activeClass();
    });

    return Build;
  }

  function Clones (Glide, Components, Events) {
    var Clones = {
      /**
       * Create pattern map and collect slides to be cloned.
       */
      mount: function mount() {
        this.items = [];

        if (Glide.isType('carousel')) {
          this.items = this.collect();
        }
      },


      /**
       * Collect clones with pattern.
       *
       * @return {[]}
       */
      collect: function collect() {
        var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide.settings,
            perView = _Glide$settings.perView,
            classes = _Glide$settings.classes;


        var peekIncrementer = +!!Glide.settings.peek;
        var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
        var append = slides.slice(0, cloneCount).reverse();
        var prepend = slides.slice(cloneCount * -1);

        for (var r = 0; r < Math.max(1, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < append.length; i++) {
            var clone = append[i].cloneNode(true);

            clone.classList.add(classes.cloneSlide);

            items.push(clone);
          }

          for (var _i = 0; _i < prepend.length; _i++) {
            var _clone = prepend[_i].cloneNode(true);

            _clone.classList.add(classes.cloneSlide);

            items.unshift(_clone);
          }
        }

        return items;
      },


      /**
       * Append cloned slides with generated pattern.
       *
       * @return {Void}
       */
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html,
            wrapper = _Components$Html.wrapper,
            slides = _Components$Html.slides;


        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append = items.slice(half * -1).reverse();
        var width = Components.Sizes.slideWidth + 'px';

        for (var i = 0; i < append.length; i++) {
          wrapper.appendChild(append[i]);
        }

        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }

        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },


      /**
       * Remove all cloned slides.
       *
       * @return {Void}
       */
      remove: function remove() {
        var items = this.items;


        for (var i = 0; i < items.length; i++) {
          Components.Html.wrapper.removeChild(items[i]);
        }
      }
    };

    define(Clones, 'grow', {
      /**
       * Gets additional dimentions value caused by clones.
       *
       * @return {Number}
       */
      get: function get() {
        return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones.items.length;
      }
    });

    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */
    Events.on('update', function () {
      Clones.remove();
      Clones.mount();
      Clones.append();
    });

    /**
     * Append additional slide's clones:
     * - while glide's type is `carousel`
     */
    Events.on('build.before', function () {
      if (Glide.isType('carousel')) {
        Clones.append();
      }
    });

    /**
     * Remove clones HTMLElements:
     * - on destroying, to bring HTML to its initial state
     */
    Events.on('destroy', function () {
      Clones.remove();
    });

    return Clones;
  }

  var EventsBinder = function () {
    /**
     * Construct a EventsBinder instance.
     */
    function EventsBinder() {
      var listeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBinder);

      this.listeners = listeners;
    }

    /**
     * Adds events listeners to arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Function} closure
     * @param  {Boolean|Object} capture
     * @return {Void}
     */


    createClass(EventsBinder, [{
      key: 'on',
      value: function on(events, el, closure) {
        var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          this.listeners[events[i]] = closure;

          el.addEventListener(events[i], this.listeners[events[i]], capture);
        }
      }

      /**
       * Removes event listeners from arrows HTML elements.
       *
       * @param  {String|Array} events
       * @param  {Element|Window|Document} el
       * @param  {Boolean|Object} capture
       * @return {Void}
       */

    }, {
      key: 'off',
      value: function off(events, el) {
        var capture = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (isString(events)) {
          events = [events];
        }

        for (var i = 0; i < events.length; i++) {
          el.removeEventListener(events[i], this.listeners[events[i]], capture);
        }
      }

      /**
       * Destroy collected listeners.
       *
       * @returns {Void}
       */

    }, {
      key: 'destroy',
      value: function destroy() {
        delete this.listeners;
      }
    }]);
    return EventsBinder;
  }();

  function Resize (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Resize = {
      /**
       * Initializes window bindings.
       */
      mount: function mount() {
        this.bind();
      },


      /**
       * Binds `rezsize` listener to the window.
       * It's a costly event, so we are debouncing it.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('resize', window, throttle(function () {
          Events.emit('resize');
        }, Glide.settings.throttle));
      },


      /**
       * Unbinds listeners from the window.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('resize', window);
      }
    };

    /**
     * Remove bindings from window:
     * - on destroying, to remove added EventListener
     */
    Events.on('destroy', function () {
      Resize.unbind();
      Binder.destroy();
    });

    return Resize;
  }

  var VALID_DIRECTIONS = ['ltr', 'rtl'];
  var FLIPED_MOVEMENTS = {
    '>': '<',
    '<': '>',
    '=': '='
  };

  function Direction (Glide, Components, Events) {
    var Direction = {
      /**
       * Setups gap value based on settings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.value = Glide.settings.direction;
      },


      /**
       * Resolves pattern based on direction value
       *
       * @param {String} pattern
       * @returns {String}
       */
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);

        if (this.is('rtl')) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }

        return pattern;
      },


      /**
       * Checks value of direction mode.
       *
       * @param {String} direction
       * @returns {Boolean}
       */
      is: function is(direction) {
        return this.value === direction;
      },


      /**
       * Applies direction class to the root HTML element.
       *
       * @return {Void}
       */
      addClass: function addClass() {
        Components.Html.root.classList.add(Glide.settings.classes.direction[this.value]);
      },


      /**
       * Removes direction class from the root HTML element.
       *
       * @return {Void}
       */
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(Glide.settings.classes.direction[this.value]);
      }
    };

    define(Direction, 'value', {
      /**
       * Gets value of the direction.
       *
       * @returns {Number}
       */
      get: function get() {
        return Direction._v;
      },


      /**
       * Sets value of the direction.
       *
       * @param {String} value
       * @return {Void}
       */
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction._v = value;
        } else {
          warn('Direction value must be `ltr` or `rtl`');
        }
      }
    });

    /**
     * Clear direction class:
     * - on destroy to bring HTML to its initial state
     * - on update to remove class before reappling bellow
     */
    Events.on(['destroy', 'update'], function () {
      Direction.removeClass();
    });

    /**
     * Remount component:
     * - on update to reflect changes in direction value
     */
    Events.on('update', function () {
      Direction.mount();
    });

    /**
     * Apply direction class:
     * - before building to apply class for the first time
     * - on updating to reapply direction class that may changed
     */
    Events.on(['build.before', 'update'], function () {
      Direction.addClass();
    });

    return Direction;
  }

  /**
   * Reflects value of glide movement.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Rtl (Glide, Components) {
    return {
      /**
       * Negates the passed translate if glide is in RTL option.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Components.Direction.is('rtl')) {
          return -translate;
        }

        return translate;
      }
    };
  }

  /**
   * Updates glide movement with a `gap` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Gap (Glide, Components) {
    return {
      /**
       * Modifies passed translate value with number in the `gap` settings.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
        return translate + Components.Gaps.value * multiplier;
      }
    };
  }

  /**
   * Updates glide movement with width of additional clones width.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Grow (Glide, Components) {
    return {
      /**
       * Adds to the passed translate width of the half of clones.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }

  /**
   * Updates glide movement with a `peek` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Peeking (Glide, Components) {
    return {
      /**
       * Modifies passed translate value with a `peek` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        if (Glide.settings.focusAt >= 0) {
          var peek = Components.Peek.value;

          if (isObject(peek)) {
            return translate - peek.before;
          }

          return translate - peek;
        }

        return translate;
      }
    };
  }

  /**
   * Updates glide movement with a `focusAt` settings.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function Focusing (Glide, Components) {
    return {
      /**
       * Modifies passed translate value with index in the `focusAt` setting.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;

        if (focusAt === 'center') {
          return translate - (width / 2 - slideWidth / 2);
        }

        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }

  /**
   * Applies diffrent transformers on translate value.
   *
   * @param  {Object} Glide
   * @param  {Object} Components
   * @return {Object}
   */
  function mutator (Glide, Components, Events) {
    /**
     * Merge instance transformers with collection of default transformers.
     * It's important that the Rtl component be last on the list,
     * so it reflects all previous transformations.
     *
     * @type {Array}
     */
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);

    return {
      /**
       * Piplines translate value with registered transformers.
       *
       * @param  {Number} translate
       * @return {Number}
       */
      mutate: function mutate(translate) {
        for (var i = 0; i < TRANSFORMERS.length; i++) {
          var transformer = TRANSFORMERS[i];

          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide, Components, Events).modify(translate);
          } else {
            warn('Transformer should be a function that returns an object with `modify()` method');
          }
        }

        return translate;
      }
    };
  }

  function Translate (Glide, Components, Events) {
    var Translate = {
      /**
       * Sets value of translate on HTML element.
       *
       * @param {Number} value
       * @return {Void}
       */
      set: function set(value) {
        var transform = mutator(Glide, Components).mutate(value);

        Components.Html.wrapper.style.transform = 'translate3d(' + -1 * transform + 'px, 0px, 0px)';
      },


      /**
       * Removes value of translate from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transform = '';
      },


      /**
       * @return {number}
       */
      getStartIndex: function getStartIndex() {
        var length = Components.Sizes.length;
        var index = Glide.index;
        var perView = Glide.settings.perView;

        if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
          return length + (index - perView);
        }

        // "modulo length" converts an index that equals length to zero
        return (index + perView) % length;
      },


      /**
       * @return {number}
       */
      getTravelDistance: function getTravelDistance() {
        var travelDistance = Components.Sizes.slideWidth * Glide.settings.perView;

        if (Components.Run.isOffset('>') || Components.Run.isOffset('|>')) {
          // reverse travel distance so that we don't have to change subtract operations
          return travelDistance * -1;
        }

        return travelDistance;
      }
    };

    /**
     * Set new translate value:
     * - on move to reflect index change
     * - on updating via API to reflect possible changes in options
     */
    Events.on('move', function (context) {
      if (!Glide.isType('carousel') || !Components.Run.isOffset()) {
        return Translate.set(context.movement);
      }

      Components.Transition.after(function () {
        Events.emit('translate.jump');

        Translate.set(Components.Sizes.slideWidth * Glide.index);
      });

      var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
      return Translate.set(startWidth - Components.Translate.getTravelDistance());
    });

    /**
     * Remove translate:
     * - on destroying to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Translate.remove();
    });

    return Translate;
  }

  function Transition (Glide, Components, Events) {
    /**
     * Holds inactivity status of transition.
     * When true transition is not applied.
     *
     * @type {Boolean}
     */
    var disabled = false;

    var Transition = {
      /**
       * Composes string of the CSS transition.
       *
       * @param {String} property
       * @return {String}
       */
      compose: function compose(property) {
        var settings = Glide.settings;

        if (!disabled) {
          return property + ' ' + this.duration + 'ms ' + settings.animationTimingFunc;
        }

        return property + ' 0ms ' + settings.animationTimingFunc;
      },


      /**
       * Sets value of transition on HTML element.
       *
       * @param {String=} property
       * @return {Void}
       */
      set: function set() {
        var property = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

        Components.Html.wrapper.style.transition = this.compose(property);
      },


      /**
       * Removes value of transition from HTML element.
       *
       * @return {Void}
       */
      remove: function remove() {
        Components.Html.wrapper.style.transition = '';
      },


      /**
       * Runs callback after animation.
       *
       * @param  {Function} callback
       * @return {Void}
       */
      after: function after(callback) {
        setTimeout(function () {
          callback();
        }, this.duration);
      },


      /**
       * Enable transition.
       *
       * @return {Void}
       */
      enable: function enable() {
        disabled = false;

        this.set();
      },


      /**
       * Disable transition.
       *
       * @return {Void}
       */
      disable: function disable() {
        disabled = true;

        this.set();
      }
    };

    define(Transition, 'duration', {
      /**
       * Gets duration of the transition based
       * on currently running animation type.
       *
       * @return {Number}
       */
      get: function get() {
        var settings = Glide.settings;

        if (Glide.isType('slider') && Components.Run.offset) {
          return settings.rewindDuration;
        }

        return settings.animationDuration;
      }
    });

    /**
     * Set transition `style` value:
     * - on each moving, because it may be cleared by offset move
     */
    Events.on('move', function () {
      Transition.set();
    });

    /**
     * Disable transition:
     * - before initial build to avoid transitioning from `0` to `startAt` index
     * - while resizing window and recalculating dimentions
     * - on jumping from offset transition at start and end edges in `carousel` type
     */
    Events.on(['build.before', 'resize', 'translate.jump'], function () {
      Transition.disable();
    });

    /**
     * Enable transition:
     * - on each running, because it may be disabled by offset move
     */
    Events.on('run', function () {
      Transition.enable();
    });

    /**
     * Remove transition:
     * - on destroying to bring markup to its inital state
     */
    Events.on('destroy', function () {
      Transition.remove();
    });

    return Transition;
  }

  /**
   * Test via a getter in the options object to see
   * if the passive property is accessed.
   *
   * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   */

  var supportsPassive = false;

  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      }
    });

    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  var supportsPassive$1 = supportsPassive;

  var START_EVENTS = ['touchstart', 'mousedown'];
  var MOVE_EVENTS = ['touchmove', 'mousemove'];
  var END_EVENTS = ['touchend', 'touchcancel', 'mouseup', 'mouseleave'];
  var MOUSE_EVENTS = ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];

  function Swipe (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var capture = supportsPassive$1 ? { passive: true } : false;

    var Swipe = {
      /**
       * Initializes swipe bindings.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bindSwipeStart();
      },


      /**
       * Handler for `swipestart` event. Calculates entry points of the user's tap.
       *
       * @param {Object} event
       * @return {Void}
       */
      start: function start(event) {
        if (!disabled && !Glide.disabled) {
          this.disable();

          var swipe = this.touches(event);

          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);

          this.bindSwipeMove();
          this.bindSwipeEnd();

          Events.emit('swipe.start');
        }
      },


      /**
       * Handler for `swipemove` event. Calculates user's tap angle and distance.
       *
       * @param {Object} event
       */
      move: function move(event) {
        if (!Glide.disabled) {
          var _Glide$settings = Glide.settings,
              touchAngle = _Glide$settings.touchAngle,
              touchRatio = _Glide$settings.touchRatio,
              classes = _Glide$settings.classes;


          var swipe = this.touches(event);

          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);

          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);

          if (swipeSin * 180 / Math.PI < touchAngle) {
            event.stopPropagation();

            Components.Move.make(subExSx * toFloat(touchRatio));

            Components.Html.root.classList.add(classes.dragging);

            Events.emit('swipe.move');
          } else {
            return false;
          }
        }
      },


      /**
       * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
       *
       * @param {Object} event
       * @return {Void}
       */
      end: function end(event) {
        if (!Glide.disabled) {
          var settings = Glide.settings;

          var swipe = this.touches(event);
          var threshold = this.threshold(event);

          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = swipeSin * 180 / Math.PI;
          var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);

          this.enable();

          if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
            // While swipe is positive and greater than threshold move backward.
            if (settings.perTouch) {
              steps = Math.min(steps, toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('<' + steps));
          } else if (swipeDistance < -threshold && swipeDeg < settings.touchAngle) {
            // While swipe is negative and lower than negative threshold move forward.
            if (settings.perTouch) {
              steps = Math.max(steps, -toInt(settings.perTouch));
            }

            if (Components.Direction.is('rtl')) {
              steps = -steps;
            }

            Components.Run.make(Components.Direction.resolve('>' + steps));
          } else {
            // While swipe don't reach distance apply previous transform.
            Components.Move.make();
          }

          Components.Html.root.classList.remove(settings.classes.dragging);

          this.unbindSwipeMove();
          this.unbindSwipeEnd();

          Events.emit('swipe.end');
        }
      },


      /**
       * Binds swipe's starting event.
       *
       * @return {Void}
       */
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;

        var settings = Glide.settings;

        if (settings.swipeThreshold) {
          Binder.on(START_EVENTS[0], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }

        if (settings.dragThreshold) {
          Binder.on(START_EVENTS[1], Components.Html.wrapper, function (event) {
            _this.start(event);
          }, capture);
        }
      },


      /**
       * Unbinds swipe's starting event.
       *
       * @return {Void}
       */
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
        Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
      },


      /**
       * Binds swipe's moving event.
       *
       * @return {Void}
       */
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;

        Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function (event) {
          _this2.move(event);
        }, Glide.settings.throttle), capture);
      },


      /**
       * Unbinds swipe's moving event.
       *
       * @return {Void}
       */
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
      },


      /**
       * Binds swipe's ending event.
       *
       * @return {Void}
       */
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;

        Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
          _this3.end(event);
        });
      },


      /**
       * Unbinds swipe's ending event.
       *
       * @return {Void}
       */
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },


      /**
       * Normalizes event touches points accorting to different types.
       *
       * @param {Object} event
       */
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }

        return event.touches[0] || event.changedTouches[0];
      },


      /**
       * Gets value of minimum swipe distance settings based on event type.
       *
       * @return {Number}
       */
      threshold: function threshold(event) {
        var settings = Glide.settings;

        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }

        return settings.swipeThreshold;
      },


      /**
       * Enables swipe event.
       *
       * @return {self}
       */
      enable: function enable() {
        disabled = false;

        Components.Transition.enable();

        return this;
      },


      /**
       * Disables swipe event.
       *
       * @return {self}
       */
      disable: function disable() {
        disabled = true;

        Components.Transition.disable();

        return this;
      }
    };

    /**
     * Add component class:
     * - after initial building
     */
    Events.on('build.after', function () {
      Components.Html.root.classList.add(Glide.settings.classes.swipeable);
    });

    /**
     * Remove swiping bindings:
     * - on destroying, to remove added EventListeners
     */
    Events.on('destroy', function () {
      Swipe.unbindSwipeStart();
      Swipe.unbindSwipeMove();
      Swipe.unbindSwipeEnd();
      Binder.destroy();
    });

    return Swipe;
  }

  function Images (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Images = {
      /**
       * Binds listener to glide wrapper.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.bind();
      },


      /**
       * Binds `dragstart` event on wrapper to prevent dragging images.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('dragstart', Components.Html.wrapper, this.dragstart);
      },


      /**
       * Unbinds `dragstart` event on wrapper.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('dragstart', Components.Html.wrapper);
      },


      /**
       * Event handler. Prevents dragging.
       *
       * @return {Void}
       */
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };

    /**
     * Remove bindings from images:
     * - on destroying, to remove added EventListeners
     */
    Events.on('destroy', function () {
      Images.unbind();
      Binder.destroy();
    });

    return Images;
  }

  function Anchors (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    /**
     * Holds detaching status of anchors.
     * Prevents detaching of already detached anchors.
     *
     * @private
     * @type {Boolean}
     */
    var detached = false;

    /**
     * Holds preventing status of anchors.
     * If `true` redirection after click will be disabled.
     *
     * @private
     * @type {Boolean}
     */
    var prevented = false;

    var Anchors = {
      /**
       * Setups a initial state of anchors component.
       *
       * @returns {Void}
       */
      mount: function mount() {
        /**
         * Holds collection of anchors elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._a = Components.Html.wrapper.querySelectorAll('a');

        this.bind();
      },


      /**
       * Binds events to anchors inside a track.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('click', Components.Html.wrapper, this.click);
      },


      /**
       * Unbinds events attached to anchors inside a track.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('click', Components.Html.wrapper);
      },


      /**
       * Handler for click event. Prevents clicks when glide is in `prevent` status.
       *
       * @param  {Object} event
       * @return {Void}
       */
      click: function click(event) {
        if (prevented) {
          event.stopPropagation();
          event.preventDefault();
        }
      },


      /**
       * Detaches anchors click event inside glide.
       *
       * @return {self}
       */
      detach: function detach() {
        prevented = true;

        if (!detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = false;

            this.items[i].setAttribute('data-href', this.items[i].getAttribute('href'));

            this.items[i].removeAttribute('href');
          }

          detached = true;
        }

        return this;
      },


      /**
       * Attaches anchors click events inside glide.
       *
       * @return {self}
       */
      attach: function attach() {
        prevented = false;

        if (detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = true;

            this.items[i].setAttribute('href', this.items[i].getAttribute('data-href'));
          }

          detached = false;
        }

        return this;
      }
    };

    define(Anchors, 'items', {
      /**
       * Gets collection of the arrows HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Anchors._a;
      }
    });

    /**
     * Detach anchors inside slides:
     * - on swiping, so they won't redirect to its `href` attributes
     */
    Events.on('swipe.move', function () {
      Anchors.detach();
    });

    /**
     * Attach anchors inside slides:
     * - after swiping and transitions ends, so they can redirect after click again
     */
    Events.on('swipe.end', function () {
      Components.Transition.after(function () {
        Anchors.attach();
      });
    });

    /**
     * Unbind anchors inside slides:
     * - on destroying, to bring anchors to its initial state
     */
    Events.on('destroy', function () {
      Anchors.attach();
      Anchors.unbind();
      Binder.destroy();
    });

    return Anchors;
  }

  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';

  function Controls (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var capture = supportsPassive$1 ? { passive: true } : false;

    var Controls = {
      /**
       * Inits arrows. Binds events listeners
       * to the arrows HTML elements.
       *
       * @return {Void}
       */
      mount: function mount() {
        /**
         * Collection of navigation HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);

        /**
         * Collection of controls HTML elements.
         *
         * @private
         * @type {HTMLCollection}
         */
        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);

        this.addBindings();
      },


      /**
       * Sets active class to current slide.
       *
       * @return {Void}
       */
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.addClass(this._n[i].children);
        }
      },


      /**
       * Removes active class to current slide.
       *
       * @return {Void}
       */
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.removeClass(this._n[i].children);
        }
      },


      /**
       * Toggles active class on items inside navigation.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      addClass: function addClass(controls) {
        var settings = Glide.settings;
        var item = controls[Glide.index];

        if (item) {
          item.classList.add(settings.classes.activeNav);

          siblings(item).forEach(function (sibling) {
            sibling.classList.remove(settings.classes.activeNav);
          });
        }
      },


      /**
       * Removes active class from active control.
       *
       * @param  {HTMLElement} controls
       * @return {Void}
       */
      removeClass: function removeClass(controls) {
        var item = controls[Glide.index];

        if (item) {
          item.classList.remove(Glide.settings.classes.activeNav);
        }
      },


      /**
       * Adds handles to the each group of controls.
       *
       * @return {Void}
       */
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },


      /**
       * Removes handles from the each group of controls.
       *
       * @return {Void}
       */
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },


      /**
       * Binds events to arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on('click', elements[i], this.click);
          Binder.on('touchstart', elements[i], this.click, capture);
        }
      },


      /**
       * Unbinds events binded to the arrows HTML elements.
       *
       * @param {HTMLCollection} elements
       * @return {Void}
       */
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(['click', 'touchstart'], elements[i]);
        }
      },


      /**
       * Handles `click` event on the arrows HTML elements.
       * Moves slider in driection precised in
       * `data-glide-dir` attribute.
       *
       * @param {Object} event
       * @return {Void}
       */
      click: function click(event) {
        event.preventDefault();

        Components.Run.make(Components.Direction.resolve(event.currentTarget.getAttribute('data-glide-dir')));
      }
    };

    define(Controls, 'items', {
      /**
       * Gets collection of the controls HTML elements.
       *
       * @return {HTMLElement[]}
       */
      get: function get() {
        return Controls._c;
      }
    });

    /**
     * Swap active class of current navigation item:
     * - after mounting to set it to initial index
     * - after each move to the new index
     */
    Events.on(['mount.after', 'move.after'], function () {
      Controls.setActive();
    });

    /**
     * Remove bindings and HTML Classes:
     * - on destroying, to bring markup to its initial state
     */
    Events.on('destroy', function () {
      Controls.removeBindings();
      Controls.removeActive();
      Binder.destroy();
    });

    return Controls;
  }

  function Keyboard (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Keyboard = {
      /**
       * Binds keyboard events on component mount.
       *
       * @return {Void}
       */
      mount: function mount() {
        if (Glide.settings.keyboard) {
          this.bind();
        }
      },


      /**
       * Adds keyboard press events.
       *
       * @return {Void}
       */
      bind: function bind() {
        Binder.on('keyup', document, this.press);
      },


      /**
       * Removes keyboard press events.
       *
       * @return {Void}
       */
      unbind: function unbind() {
        Binder.off('keyup', document);
      },


      /**
       * Handles keyboard's arrows press and moving glide foward and backward.
       *
       * @param  {Object} event
       * @return {Void}
       */
      press: function press(event) {
        if (event.keyCode === 39) {
          Components.Run.make(Components.Direction.resolve('>'));
        }

        if (event.keyCode === 37) {
          Components.Run.make(Components.Direction.resolve('<'));
        }
      }
    };

    /**
     * Remove bindings from keyboard:
     * - on destroying to remove added events
     * - on updating to remove events before remounting
     */
    Events.on(['destroy', 'update'], function () {
      Keyboard.unbind();
    });

    /**
     * Remount component
     * - on updating to reflect potential changes in settings
     */
    Events.on('update', function () {
      Keyboard.mount();
    });

    /**
     * Destroy binder:
     * - on destroying to remove listeners
     */
    Events.on('destroy', function () {
      Binder.destroy();
    });

    return Keyboard;
  }

  function Autoplay (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    var Autoplay = {
      /**
       * Initializes autoplaying and events.
       *
       * @return {Void}
       */
      mount: function mount() {
        this.start();

        if (Glide.settings.hoverpause) {
          this.bind();
        }
      },


      /**
       * Starts autoplaying in configured interval.
       *
       * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
       * @return {Void}
       */
      start: function start() {
        var _this = this;

        if (Glide.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function () {
              _this.stop();

              Components.Run.make('>');

              _this.start();
            }, this.time);
          }
        }
      },


      /**
       * Stops autorunning of the glide.
       *
       * @return {Void}
       */
      stop: function stop() {
        this._i = clearInterval(this._i);
      },


      /**
       * Stops autoplaying while mouse is over glide's area.
       *
       * @return {Void}
       */
      bind: function bind() {
        var _this2 = this;

        Binder.on('mouseover', Components.Html.root, function () {
          _this2.stop();
        });

        Binder.on('mouseout', Components.Html.root, function () {
          _this2.start();
        });
      },


      /**
       * Unbind mouseover events.
       *
       * @returns {Void}
       */
      unbind: function unbind() {
        Binder.off(['mouseover', 'mouseout'], Components.Html.root);
      }
    };

    define(Autoplay, 'time', {
      /**
       * Gets time period value for the autoplay interval. Prioritizes
       * times in `data-glide-autoplay` attrubutes over options.
       *
       * @return {Number}
       */
      get: function get() {
        var autoplay = Components.Html.slides[Glide.index].getAttribute('data-glide-autoplay');

        if (autoplay) {
          return toInt(autoplay);
        }

        return toInt(Glide.settings.autoplay);
      }
    });

    /**
     * Stop autoplaying and unbind events:
     * - on destroying, to clear defined interval
     * - on updating via API to reset interval that may changed
     */
    Events.on(['destroy', 'update'], function () {
      Autoplay.unbind();
    });

    /**
     * Stop autoplaying:
     * - before each run, to restart autoplaying
     * - on pausing via API
     * - on destroying, to clear defined interval
     * - while starting a swipe
     * - on updating via API to reset interval that may changed
     */
    Events.on(['run.before', 'pause', 'destroy', 'swipe.start', 'update'], function () {
      Autoplay.stop();
    });

    /**
     * Start autoplaying:
     * - after each run, to restart autoplaying
     * - on playing via API
     * - while ending a swipe
     */
    Events.on(['run.after', 'play', 'swipe.end'], function () {
      Autoplay.start();
    });

    /**
     * Remount autoplaying:
     * - on updating via API to reset interval that may changed
     */
    Events.on('update', function () {
      Autoplay.mount();
    });

    /**
     * Destroy a binder:
     * - on destroying glide instance to clearup listeners
     */
    Events.on('destroy', function () {
      Binder.destroy();
    });

    return Autoplay;
  }

  /**
   * Sorts keys of breakpoint object so they will be ordered from lower to bigger.
   *
   * @param {Object} points
   * @returns {Object}
   */
  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn('Breakpoints option must be an object');
    }

    return {};
  }

  function Breakpoints (Glide, Components, Events) {
    /**
     * Instance of the binder for DOM Events.
     *
     * @type {EventsBinder}
     */
    var Binder = new EventsBinder();

    /**
     * Holds reference to settings.
     *
     * @type {Object}
     */
    var settings = Glide.settings;

    /**
     * Holds reference to breakpoints object in settings. Sorts breakpoints
     * from smaller to larger. It is required in order to proper
     * matching currently active breakpoint settings.
     *
     * @type {Object}
     */
    var points = sortBreakpoints(settings.breakpoints);

    /**
     * Cache initial settings before overwritting.
     *
     * @type {Object}
     */
    var defaults = _extends({}, settings);

    var Breakpoints = {
      /**
       * Matches settings for currectly matching media breakpoint.
       *
       * @param {Object} points
       * @returns {Object}
       */
      match: function match(points) {
        if (typeof window.matchMedia !== 'undefined') {
          for (var point in points) {
            if (points.hasOwnProperty(point)) {
              if (window.matchMedia('(max-width: ' + point + 'px)').matches) {
                return points[point];
              }
            }
          }
        }

        return defaults;
      }
    };

    /**
     * Overwrite instance settings with currently matching breakpoint settings.
     * This happens right after component initialization.
     */
    _extends(settings, Breakpoints.match(points));

    /**
     * Update glide with settings of matched brekpoint:
     * - window resize to update slider
     */
    Binder.on('resize', window, throttle(function () {
      Glide.settings = mergeOptions(settings, Breakpoints.match(points));
    }, Glide.settings.throttle));

    /**
     * Resort and update default settings:
     * - on reinit via API, so breakpoint matching will be performed with options
     */
    Events.on('update', function () {
      points = sortBreakpoints(points);

      defaults = _extends({}, settings);
    });

    /**
     * Unbind resize listener:
     * - on destroying, to bring markup to its initial state
     */
    Events.on('destroy', function () {
      Binder.off('resize', window);
    });

    return Breakpoints;
  }

  var COMPONENTS = {
    // Required
    Html: Html,
    Translate: Translate,
    Transition: Transition,
    Direction: Direction,
    Peek: Peek,
    Sizes: Sizes,
    Gaps: Gaps,
    Move: Move,
    Clones: Clones,
    Resize: Resize,
    Build: Build,
    Run: Run,

    // Optional
    Swipe: Swipe,
    Images: Images,
    Anchors: Anchors,
    Controls: Controls,
    Keyboard: Keyboard,
    Autoplay: Autoplay,
    Breakpoints: Breakpoints
  };

  var Glide$1 = function (_Core) {
    inherits(Glide$$1, _Core);

    function Glide$$1() {
      classCallCheck(this, Glide$$1);
      return possibleConstructorReturn(this, (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(this, arguments));
    }

    createClass(Glide$$1, [{
      key: 'mount',
      value: function mount() {
        var extensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return get(Glide$$1.prototype.__proto__ || Object.getPrototypeOf(Glide$$1.prototype), 'mount', this).call(this, _extends({}, COMPONENTS, extensions));
      }
    }]);
    return Glide$$1;
  }(Glide);

  return Glide$1;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xpZGUuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0cy5qcyIsIi4uL3NyYy91dGlscy9sb2cuanMiLCIuLi9zcmMvdXRpbHMvdW5pdC5qcyIsIi4uL3NyYy9jb3JlL2luZGV4LmpzIiwiLi4vc3JjL3V0aWxzL29iamVjdC5qcyIsIi4uL3NyYy9jb3JlL2V2ZW50L2V2ZW50cy1idXMuanMiLCIuLi9zcmMvaW5kZXguanMiLCIuLi9zcmMvY29tcG9uZW50cy9ydW4uanMiLCIuLi9zcmMvdXRpbHMvdGltZS5qcyIsIi4uL3NyYy91dGlscy93YWl0LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvZ2Fwcy5qcyIsIi4uL3NyYy91dGlscy9kb20uanMiLCIuLi9zcmMvY29tcG9uZW50cy9odG1sLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvcGVlay5qcyIsIi4uL3NyYy9jb21wb25lbnRzL21vdmUuanMiLCIuLi9zcmMvY29tcG9uZW50cy9zaXplcy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2J1aWxkLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvY2xvbmVzLmpzIiwiLi4vc3JjL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlci5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2RpcmVjdGlvbi5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9ydGwuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvZ2FwLmpzIiwiLi4vc3JjL211dGF0b3IvdHJhbnNmb3JtZXJzL2dyb3cuanMiLCIuLi9zcmMvbXV0YXRvci90cmFuc2Zvcm1lcnMvcGVla2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL3RyYW5zZm9ybWVycy9mb2N1c2luZy5qcyIsIi4uL3NyYy9tdXRhdG9yL2luZGV4LmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNsYXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvdHJhbnNpdGlvbi5qcyIsIi4uL3NyYy91dGlscy9kZXRlY3QtcGFzc2l2ZS1ldmVudC5qcyIsIi4uL3NyYy9jb21wb25lbnRzL3N3aXBlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW1hZ2VzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvYW5jaG9ycy5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2NvbnRyb2xzLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMva2V5Ym9hcmQuanMiLCIuLi9zcmMvY29tcG9uZW50cy9hdXRvcGxheS5qcyIsIi4uL3NyYy9jb21wb25lbnRzL2JyZWFrcG9pbnRzLmpzIiwiLi4vZW50cnkvZW50cnktY29tcGxldGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogVHlwZSBvZiB0aGUgbW92ZW1lbnQuXG4gICAqXG4gICAqIEF2YWlsYWJsZSB0eXBlczpcbiAgICogYHNsaWRlcmAgLSBSZXdpbmRzIHNsaWRlciB0byB0aGUgc3RhcnQvZW5kIHdoZW4gaXQgcmVhY2hlcyB0aGUgZmlyc3Qgb3IgbGFzdCBzbGlkZS5cbiAgICogYGNhcm91c2VsYCAtIENoYW5nZXMgc2xpZGVzIHdpdGhvdXQgc3RhcnRpbmcgb3ZlciB3aGVuIGl0IHJlYWNoZXMgdGhlIGZpcnN0IG9yIGxhc3Qgc2xpZGUuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICB0eXBlOiAnc2xpZGVyJyxcblxuICAvKipcbiAgICogU3RhcnQgYXQgc3BlY2lmaWMgc2xpZGUgbnVtYmVyIGRlZmluZWQgd2l0aCB6ZXJvLWJhc2VkIGluZGV4LlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgc3RhcnRBdDogMCxcblxuICAvKipcbiAgICogQSBudW1iZXIgb2Ygc2xpZGVzIHZpc2libGUgb24gdGhlIHNpbmdsZSB2aWV3cG9ydC5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHBlclZpZXc6IDEsXG5cbiAgLyoqXG4gICAqIEZvY3VzIGN1cnJlbnRseSBhY3RpdmUgc2xpZGUgYXQgYSBzcGVjaWZpZWQgcG9zaXRpb24gaW4gdGhlIHRyYWNrLlxuICAgKlxuICAgKiBBdmFpbGFibGUgaW5wdXRzOlxuICAgKiBgY2VudGVyYCAtIEN1cnJlbnQgc2xpZGUgd2lsbCBiZSBhbHdheXMgZm9jdXNlZCBhdCB0aGUgY2VudGVyIG9mIGEgdHJhY2suXG4gICAqIGAwLDEsMiwzLi4uYCAtIEN1cnJlbnQgc2xpZGUgd2lsbCBiZSBmb2N1c2VkIG9uIHRoZSBzcGVjaWZpZWQgemVyby1iYXNlZCBpbmRleC5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ3xOdW1iZXJ9XG4gICAqL1xuICBmb2N1c0F0OiAwLFxuXG4gIC8qKlxuICAgKiBBIHNpemUgb2YgdGhlIGdhcCBhZGRlZCBiZXR3ZWVuIHNsaWRlcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdhcDogMTAsXG5cbiAgLyoqXG4gICAqIENoYW5nZSBzbGlkZXMgYWZ0ZXIgYSBzcGVjaWZpZWQgaW50ZXJ2YWwuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhdXRvcGxheS5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgYXV0b3BsYXk6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBTdG9wIGF1dG9wbGF5IG9uIG1vdXNlb3ZlciBldmVudC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBob3ZlcnBhdXNlOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBBbGxvdyBmb3IgY2hhbmdpbmcgc2xpZGVzIHdpdGggbGVmdCBhbmQgcmlnaHQga2V5Ym9hcmQgYXJyb3dzLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGtleWJvYXJkOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBTdG9wIHJ1bm5pbmcgYHBlclZpZXdgIG51bWJlciBvZiBzbGlkZXMgZnJvbSB0aGUgZW5kLiBVc2UgdGhpc1xuICAgKiBvcHRpb24gaWYgeW91IGRvbid0IHdhbnQgdG8gaGF2ZSBhbiBlbXB0eSBzcGFjZSBhZnRlclxuICAgKiBhIHNsaWRlci4gV29ya3Mgb25seSB3aXRoIGBzbGlkZXJgIHR5cGUgYW5kIGFcbiAgICogbm9uLWNlbnRlcmVkIGBmb2N1c0F0YCBzZXR0aW5nLlxuICAgKlxuICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICovXG4gIGJvdW5kOiBmYWxzZSxcblxuICAvKipcbiAgICogTWluaW1hbCBzd2lwZSBkaXN0YW5jZSBuZWVkZWQgdG8gY2hhbmdlIHRoZSBzbGlkZS4gVXNlIGBmYWxzZWAgZm9yIHR1cm5pbmcgb2ZmIGEgc3dpcGluZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcnxCb29sZWFufVxuICAgKi9cbiAgc3dpcGVUaHJlc2hvbGQ6IDgwLFxuXG4gIC8qKlxuICAgKiBNaW5pbWFsIG1vdXNlIGRyYWcgZGlzdGFuY2UgbmVlZGVkIHRvIGNoYW5nZSB0aGUgc2xpZGUuIFVzZSBgZmFsc2VgIGZvciB0dXJuaW5nIG9mZiBhIGRyYWdnaW5nLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBkcmFnVGhyZXNob2xkOiAxMjAsXG5cbiAgLyoqXG4gICAqIEEgbWF4aW11bSBudW1iZXIgb2Ygc2xpZGVzIHRvIHdoaWNoIG1vdmVtZW50IHdpbGwgYmUgbWFkZSBvbiBzd2lwaW5nIG9yIGRyYWdnaW5nLiBVc2UgYGZhbHNlYCBmb3IgdW5saW1pdGVkLlxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfEJvb2xlYW59XG4gICAqL1xuICBwZXJUb3VjaDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIE1vdmluZyBkaXN0YW5jZSByYXRpbyBvZiB0aGUgc2xpZGVzIG9uIGEgc3dpcGluZyBhbmQgZHJhZ2dpbmcuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICB0b3VjaFJhdGlvOiAwLjUsXG5cbiAgLyoqXG4gICAqIEFuZ2xlIHJlcXVpcmVkIHRvIGFjdGl2YXRlIHNsaWRlcyBtb3Zpbmcgb24gc3dpcGluZyBvciBkcmFnZ2luZy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRvdWNoQW5nbGU6IDQ1LFxuXG4gIC8qKlxuICAgKiBEdXJhdGlvbiBvZiB0aGUgYW5pbWF0aW9uIGluIG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGFuaW1hdGlvbkR1cmF0aW9uOiA0MDAsXG5cbiAgLyoqXG4gICAqIEFsbG93cyBsb29waW5nIHRoZSBgc2xpZGVyYCB0eXBlLiBTbGlkZXIgd2lsbCByZXdpbmQgdG8gdGhlIGZpcnN0L2xhc3Qgc2xpZGUgd2hlbiBpdCdzIGF0IHRoZSBzdGFydC9lbmQuXG4gICAqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgcmV3aW5kOiB0cnVlLFxuXG4gIC8qKlxuICAgKiBEdXJhdGlvbiBvZiB0aGUgcmV3aW5kaW5nIGFuaW1hdGlvbiBvZiB0aGUgYHNsaWRlcmAgdHlwZSBpbiBtaWxsaXNlY29uZHMuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICByZXdpbmREdXJhdGlvbjogODAwLFxuXG4gIC8qKlxuICAgKiBFYXNpbmcgZnVuY3Rpb24gZm9yIHRoZSBhbmltYXRpb24uXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBhbmltYXRpb25UaW1pbmdGdW5jOiAnY3ViaWMtYmV6aWVyKC4xNjUsIC44NDAsIC40NDAsIDEpJyxcblxuICAvKipcbiAgICogV2FpdCBmb3IgdGhlIGFuaW1hdGlvbiB0byBmaW5pc2ggdW50aWwgdGhlIG5leHQgdXNlciBpbnB1dCBjYW4gYmUgcHJvY2Vzc2VkXG4gICAqXG4gICAqIEB0eXBlIHtib29sZWFufVxuICAgKi9cbiAgd2FpdEZvclRyYW5zaXRpb246IHRydWUsXG5cbiAgLyoqXG4gICAqIFRocm90dGxlIGNvc3RseSBldmVudHMgYXQgbW9zdCBvbmNlIHBlciBldmVyeSB3YWl0IG1pbGxpc2Vjb25kcy5cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIHRocm90dGxlOiAxMCxcblxuICAvKipcbiAgICogTW92aW5nIGRpcmVjdGlvbiBtb2RlLlxuICAgKlxuICAgKiBBdmFpbGFibGUgaW5wdXRzOlxuICAgKiAtICdsdHInIC0gbGVmdCB0byByaWdodCBtb3ZlbWVudCxcbiAgICogLSAncnRsJyAtIHJpZ2h0IHRvIGxlZnQgbW92ZW1lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBkaXJlY3Rpb246ICdsdHInLFxuXG4gIC8qKlxuICAgKiBUaGUgZGlzdGFuY2UgdmFsdWUgb2YgdGhlIG5leHQgYW5kIHByZXZpb3VzIHZpZXdwb3J0cyB3aGljaFxuICAgKiBoYXZlIHRvIHBlZWsgaW4gdGhlIGN1cnJlbnQgdmlldy4gQWNjZXB0cyBudW1iZXIgYW5kXG4gICAqIHBpeGVscyBhcyBhIHN0cmluZy4gTGVmdCBhbmQgcmlnaHQgcGVla2luZyBjYW4gYmVcbiAgICogc2V0IHVwIHNlcGFyYXRlbHkgd2l0aCBhIGRpcmVjdGlvbnMgb2JqZWN0LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZTpcbiAgICogYDEwMGAgLSBQZWVrIDEwMHB4IG9uIHRoZSBib3RoIHNpZGVzLlxuICAgKiB7IGJlZm9yZTogMTAwLCBhZnRlcjogNTAgfWAgLSBQZWVrIDEwMHB4IG9uIHRoZSBsZWZ0IHNpZGUgYW5kIDUwcHggb24gdGhlIHJpZ2h0IHNpZGUuXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ8U3RyaW5nfE9iamVjdH1cbiAgICovXG4gIHBlZWs6IDAsXG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2Ygb3B0aW9ucyBhcHBsaWVkIGF0IHNwZWNpZmllZCBtZWRpYSBicmVha3BvaW50cy5cbiAgICogRm9yIGV4YW1wbGU6IGRpc3BsYXkgdHdvIHNsaWRlcyBwZXIgdmlldyB1bmRlciA4MDBweC5cbiAgICogYHtcbiAgICogICAnODAwcHgnOiB7XG4gICAqICAgICBwZXJWaWV3OiAyXG4gICAqICAgfVxuICAgKiB9YFxuICAgKi9cbiAgYnJlYWtwb2ludHM6IHt9LFxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIGludGVybmFsbHkgdXNlZCBIVE1MIGNsYXNzZXMuXG4gICAqXG4gICAqIEB0b2RvIFJlZmFjdG9yIGBzbGlkZXJgIGFuZCBgY2Fyb3VzZWxgIHByb3BlcnRpZXMgdG8gc2luZ2xlIGB0eXBlOiB7IHNsaWRlcjogJycsIGNhcm91c2VsOiAnJyB9YCBvYmplY3RcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGNsYXNzZXM6IHtcbiAgICBkaXJlY3Rpb246IHtcbiAgICAgIGx0cjogJ2dsaWRlLS1sdHInLFxuICAgICAgcnRsOiAnZ2xpZGUtLXJ0bCdcbiAgICB9LFxuICAgIHNsaWRlcjogJ2dsaWRlLS1zbGlkZXInLFxuICAgIGNhcm91c2VsOiAnZ2xpZGUtLWNhcm91c2VsJyxcbiAgICBzd2lwZWFibGU6ICdnbGlkZS0tc3dpcGVhYmxlJyxcbiAgICBkcmFnZ2luZzogJ2dsaWRlLS1kcmFnZ2luZycsXG4gICAgY2xvbmVTbGlkZTogJ2dsaWRlX19zbGlkZS0tY2xvbmUnLFxuICAgIGFjdGl2ZU5hdjogJ2dsaWRlX19idWxsZXQtLWFjdGl2ZScsXG4gICAgYWN0aXZlU2xpZGU6ICdnbGlkZV9fc2xpZGUtLWFjdGl2ZScsXG4gICAgZGlzYWJsZWRBcnJvdzogJ2dsaWRlX19hcnJvdy0tZGlzYWJsZWQnXG4gIH1cbn1cbiIsIi8qKlxuICogT3V0cHV0cyB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGJvd3NlciBjb25zb2xlLlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gbXNnXG4gKiBAcmV0dXJuIHtWb2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gd2FybiAobXNnKSB7XG4gIGNvbnNvbGUuZXJyb3IoYFtHbGlkZSB3YXJuXTogJHttc2d9YClcbn1cbiIsIi8qKlxuICogQ29udmVydHMgdmFsdWUgZW50ZXJlZCBhcyBudW1iZXJcbiAqIG9yIHN0cmluZyB0byBpbnRlZ2VyIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSW50ICh2YWx1ZSkge1xuICByZXR1cm4gcGFyc2VJbnQodmFsdWUpXG59XG5cbi8qKlxuICogQ29udmVydHMgdmFsdWUgZW50ZXJlZCBhcyBudW1iZXJcbiAqIG9yIHN0cmluZyB0byBmbGF0IHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvRmxvYXQgKHZhbHVlKSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKVxufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtICB7Kn0gICB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSAgeyp9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCAodmFsdWUpIHtcbiAgbGV0IHR5cGUgPSB0eXBlb2YgdmFsdWVcblxuICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIXZhbHVlIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzXG59XG5cbi8qKlxuICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCB2YWx1ZSBpcyBhIG51bWJlci5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24gKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcbn1cblxuLyoqXG4gKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0gIHsqfSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVW5kZWZpbmVkICh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJ1xufVxuXG4vKipcbiAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgdmFsdWUgaXMgYW4gYXJyYXkuXG4gKlxuICogQHBhcmFtICB7Kn0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0FycmF5ICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUuY29uc3RydWN0b3IgPT09IEFycmF5XG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vdXRpbHMvbG9nJ1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgaW5pdGlhbGl6ZXMgc3BlY2lmaWVkIGNvbGxlY3Rpb24gb2YgZXh0ZW5zaW9ucy5cbiAqIEVhY2ggZXh0ZW5zaW9uIHJlY2VpdmVzIGFjY2VzcyB0byBpbnN0YW5jZSBvZiBnbGlkZSBhbmQgcmVzdCBvZiBjb21wb25lbnRzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBnbGlkZVxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnNcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbW91bnQgKGdsaWRlLCBleHRlbnNpb25zLCBldmVudHMpIHtcbiAgbGV0IGNvbXBvbmVudHMgPSB7fVxuXG4gIGZvciAobGV0IG5hbWUgaW4gZXh0ZW5zaW9ucykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGV4dGVuc2lvbnNbbmFtZV0pKSB7XG4gICAgICBjb21wb25lbnRzW25hbWVdID0gZXh0ZW5zaW9uc1tuYW1lXShnbGlkZSwgY29tcG9uZW50cywgZXZlbnRzKVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKCdFeHRlbnNpb24gbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBuYW1lIGluIGNvbXBvbmVudHMpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjb21wb25lbnRzW25hbWVdLm1vdW50KSkge1xuICAgICAgY29tcG9uZW50c1tuYW1lXS5tb3VudCgpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudHNcbn1cbiIsIi8qKlxuICogRGVmaW5lcyBnZXR0ZXIgYW5kIHNldHRlciBwcm9wZXJ0eSBvbiB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iaiAgICAgICAgIE9iamVjdCB3aGVyZSBwcm9wZXJ0eSBoYXMgdG8gYmUgZGVmaW5lZC5cbiAqIEBwYXJhbSAge1N0cmluZ30gcHJvcCAgICAgICAgTmFtZSBvZiB0aGUgZGVmaW5lZCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSAge09iamVjdH0gZGVmaW5pdGlvbiAgR2V0IGFuZCBzZXQgZGVmaW5pdGlvbnMgZm9yIHRoZSBwcm9wZXJ0eS5cbiAqIEByZXR1cm4ge1ZvaWR9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmUgKG9iaiwgcHJvcCwgZGVmaW5pdGlvbikge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBkZWZpbml0aW9uKVxufVxuXG4vKipcbiAqIFNvcnRzIGFwaGFiZXRpY2FsbHkgb2JqZWN0IGtleXMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNvcnRLZXlzIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuc29ydCgpLnJlZHVjZSgociwgaykgPT4ge1xuICAgIHJba10gPSBvYmpba11cblxuICAgIHJldHVybiAocltrXSwgcilcbiAgfSwge30pXG59XG5cbi8qKlxuICogTWVyZ2VzIHBhc3NlZCBzZXR0aW5ncyBvYmplY3Qgd2l0aCBkZWZhdWx0IG9wdGlvbnMuXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBkZWZhdWx0c1xuICogQHBhcmFtICB7T2JqZWN0fSBzZXR0aW5nc1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPcHRpb25zIChkZWZhdWx0cywgc2V0dGluZ3MpIHtcbiAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgc2V0dGluZ3MpXG5cbiAgLy8gYE9iamVjdC5hc3NpZ25gIGRvIG5vdCBkZWVwbHkgbWVyZ2Ugb2JqZWN0cywgc28gd2VcbiAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseSBmb3IgZXZlcnkgbmVzdGVkIG9iamVjdFxuICAvLyBpbiBvcHRpb25zLiBBbHRob3VnaCBpdCBkb2VzIG5vdCBsb29rIHNtYXJ0LFxuICAvLyBpdCdzIHNtYWxsZXIgYW5kIGZhc3RlciB0aGFuIHNvbWUgZmFuY3lcbiAgLy8gbWVyZ2luZyBkZWVwLW1lcmdlIGFsZ29yaXRobSBzY3JpcHQuXG4gIGlmIChzZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eSgnY2xhc3NlcycpKSB7XG4gICAgb3B0aW9ucy5jbGFzc2VzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuY2xhc3Nlcywgc2V0dGluZ3MuY2xhc3NlcylcblxuICAgIGlmIChzZXR0aW5ncy5jbGFzc2VzLmhhc093blByb3BlcnR5KCdkaXJlY3Rpb24nKSkge1xuICAgICAgb3B0aW9ucy5jbGFzc2VzLmRpcmVjdGlvbiA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLmNsYXNzZXMuZGlyZWN0aW9uLCBzZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvbilcbiAgICB9XG4gIH1cblxuICBpZiAoc2V0dGluZ3MuaGFzT3duUHJvcGVydHkoJ2JyZWFrcG9pbnRzJykpIHtcbiAgICBvcHRpb25zLmJyZWFrcG9pbnRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMuYnJlYWtwb2ludHMsIHNldHRpbmdzLmJyZWFrcG9pbnRzKVxuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnNcbn1cbiIsImltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi8uLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudHNCdXMge1xuICAvKipcbiAgICogQ29uc3RydWN0IGEgRXZlbnRCdXMgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudHNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChldmVudHMgPSB7fSkge1xuICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzXG4gICAgdGhpcy5ob3AgPSBldmVudHMuaGFzT3duUHJvcGVydHlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGxpc3RlbmVyIHRvIHRoZSBzcGVjaWZlZCBldmVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcbiAgICovXG4gIG9uIChldmVudCwgaGFuZGxlcikge1xuICAgIGlmIChpc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLm9uKGV2ZW50W2ldLCBoYW5kbGVyKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgZXZlbnQncyBvYmplY3QgaWYgbm90IHlldCBjcmVhdGVkXG4gICAgaWYgKCF0aGlzLmhvcC5jYWxsKHRoaXMuZXZlbnRzLCBldmVudCkpIHtcbiAgICAgIHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdXG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBoYW5kbGVyIHRvIHF1ZXVlXG4gICAgdmFyIGluZGV4ID0gdGhpcy5ldmVudHNbZXZlbnRdLnB1c2goaGFuZGxlcikgLSAxXG5cbiAgICAvLyBQcm92aWRlIGhhbmRsZSBiYWNrIGZvciByZW1vdmFsIG9mIGV2ZW50XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlbW92ZSAoKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudF1baW5kZXhdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1bnMgcmVnaXN0ZXJlZCBoYW5kbGVycyBmb3Igc3BlY2lmaWVkIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBjb250ZXh0XG4gICAqL1xuICBlbWl0IChldmVudCwgY29udGV4dCkge1xuICAgIGlmIChpc0FycmF5KGV2ZW50KSkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmVtaXQoZXZlbnRbaV0sIGNvbnRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGV2ZW50IGRvZXNuJ3QgZXhpc3QsIG9yIHRoZXJlJ3Mgbm8gaGFuZGxlcnMgaW4gcXVldWUsIGp1c3QgbGVhdmVcbiAgICBpZiAoIXRoaXMuaG9wLmNhbGwodGhpcy5ldmVudHMsIGV2ZW50KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gQ3ljbGUgdGhyb3VnaCBldmVudHMgcXVldWUsIGZpcmUhXG4gICAgdGhpcy5ldmVudHNbZXZlbnRdLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0oY29udGV4dCB8fCB7fSlcbiAgICB9KVxuICB9XG59XG4iLCJpbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cydcclxuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4vdXRpbHMvbG9nJ1xyXG5pbXBvcnQgeyBtb3VudCB9IGZyb20gJy4vY29yZS9pbmRleCdcclxuaW1wb3J0IHsgbWVyZ2VPcHRpb25zIH0gZnJvbSAnLi91dGlscy9vYmplY3QnXHJcbmltcG9ydCB7IHRvSW50LCBpc09iamVjdCwgaXNBcnJheSB9IGZyb20gJy4vdXRpbHMvdW5pdCdcclxuXHJcbmltcG9ydCBFdmVudHNCdXMgZnJvbSAnLi9jb3JlL2V2ZW50L2V2ZW50cy1idXMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbGlkZSB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGdsaWRlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtICB7U3RyaW5nfSBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yIChzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLl9jID0ge31cclxuICAgIHRoaXMuX3QgPSBbXVxyXG4gICAgdGhpcy5fZSA9IG5ldyBFdmVudHNCdXMoKVxyXG5cclxuICAgIHRoaXMuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yXHJcbiAgICB0aGlzLnNldHRpbmdzID0gbWVyZ2VPcHRpb25zKGRlZmF1bHRzLCBvcHRpb25zKVxyXG4gICAgdGhpcy5pbmRleCA9IHRoaXMuc2V0dGluZ3Muc3RhcnRBdFxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6ZXMgZ2xpZGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gZXh0ZW5zaW9ucyBDb2xsZWN0aW9uIG9mIGV4dGVuc2lvbnMgdG8gaW5pdGlhbGl6ZS5cclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBtb3VudCAoZXh0ZW5zaW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLl9lLmVtaXQoJ21vdW50LmJlZm9yZScpXHJcblxyXG4gICAgaWYgKGlzT2JqZWN0KGV4dGVuc2lvbnMpKSB7XHJcbiAgICAgIHRoaXMuX2MgPSBtb3VudCh0aGlzLCBleHRlbnNpb25zLCB0aGlzLl9lKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2FybignWW91IG5lZWQgdG8gcHJvdmlkZSBhIG9iamVjdCBvbiBgbW91bnQoKWAnKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2UuZW1pdCgnbW91bnQuYWZ0ZXInKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb2xsZWN0cyBhbiBpbnN0YW5jZSBgdHJhbnNsYXRlYCB0cmFuc2Zvcm1lcnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtBcnJheX0gdHJhbnNmb3JtZXJzIENvbGxlY3Rpb24gb2YgdHJhbnNmb3JtZXJzLlxyXG4gICAqIEByZXR1cm4ge1ZvaWR9XHJcbiAgICovXHJcbiAgbXV0YXRlICh0cmFuc2Zvcm1lcnMgPSBbXSkge1xyXG4gICAgaWYgKGlzQXJyYXkodHJhbnNmb3JtZXJzKSkge1xyXG4gICAgICB0aGlzLl90ID0gdHJhbnNmb3JtZXJzXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJuKCdZb3UgbmVlZCB0byBwcm92aWRlIGEgYXJyYXkgb24gYG11dGF0ZSgpYCcpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgZ2xpZGUgd2l0aCBzcGVjaWZpZWQgc2V0dGluZ3MuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3NcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICB1cGRhdGUgKHNldHRpbmdzID0ge30pIHtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBtZXJnZU9wdGlvbnModGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpXHJcblxyXG4gICAgaWYgKHNldHRpbmdzLmhhc093blByb3BlcnR5KCdzdGFydEF0JykpIHtcclxuICAgICAgdGhpcy5pbmRleCA9IHNldHRpbmdzLnN0YXJ0QXRcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lLmVtaXQoJ3VwZGF0ZScpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSBzbGlkZSB3aXRoIHNwZWNpZmllZCBwYXR0ZXJuLiBBIHBhdHRlcm4gbXVzdCBiZSBpbiB0aGUgc3BlY2lhbCBmb3JtYXQ6XHJcbiAgICogYD5gIC0gTW92ZSBvbmUgZm9yd2FyZFxyXG4gICAqIGA8YCAtIE1vdmUgb25lIGJhY2t3YXJkXHJcbiAgICogYD17aX1gIC0gR28gdG8ge2l9IHplcm8tYmFzZWQgc2xpZGUgKGVxLiAnPTEnLCB3aWxsIGdvIHRvIHNlY29uZCBzbGlkZSlcclxuICAgKiBgPj5gIC0gUmV3aW5kcyB0byBlbmQgKGxhc3Qgc2xpZGUpXHJcbiAgICogYDw8YCAtIFJld2luZHMgdG8gc3RhcnQgKGZpcnN0IHNsaWRlKVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdHRlcm5cclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBnbyAocGF0dGVybikge1xyXG4gICAgdGhpcy5fYy5SdW4ubWFrZShwYXR0ZXJuKVxyXG5cclxuICAgIHJldHVybiB0aGlzXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNb3ZlIHRyYWNrIGJ5IHNwZWNpZmllZCBkaXN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkaXN0YW5jZVxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIG1vdmUgKGRpc3RhbmNlKSB7XHJcbiAgICB0aGlzLl9jLlRyYW5zaXRpb24uZGlzYWJsZSgpXHJcbiAgICB0aGlzLl9jLk1vdmUubWFrZShkaXN0YW5jZSlcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBpbnN0YW5jZSBhbmQgcmV2ZXJ0IGFsbCBjaGFuZ2VzIGRvbmUgYnkgdGhpcy5fYy5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIGRlc3Ryb3kgKCkge1xyXG4gICAgdGhpcy5fZS5lbWl0KCdkZXN0cm95JylcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0Jvb2xlYW58TnVtYmVyfSBpbnRlcnZhbCBSdW4gYXV0b3BsYXlpbmcgd2l0aCBwYXNzZWQgaW50ZXJ2YWwgcmVnYXJkbGVzcyBvZiBgYXV0b3BsYXlgIHNldHRpbmdzXHJcbiAgICogQHJldHVybiB7R2xpZGV9XHJcbiAgICovXHJcbiAgcGxheSAoaW50ZXJ2YWwgPSBmYWxzZSkge1xyXG4gICAgaWYgKGludGVydmFsKSB7XHJcbiAgICAgIHRoaXMuc2V0dGluZ3MuYXV0b3BsYXkgPSBpbnRlcnZhbFxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2UuZW1pdCgncGxheScpXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3AgaW5zdGFuY2UgYXV0b3BsYXlpbmcuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBwYXVzZSAoKSB7XHJcbiAgICB0aGlzLl9lLmVtaXQoJ3BhdXNlJylcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBnbGlkZSBpbnRvIGEgaWRsZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBkaXNhYmxlICgpIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSB0cnVlXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgZ2xpZGUgaW50byBhIGFjdGl2ZSBzdGF0dXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtHbGlkZX1cclxuICAgKi9cclxuICBlbmFibGUgKCkge1xyXG4gICAgdGhpcy5kaXNhYmxlZCA9IGZhbHNlXHJcblxyXG4gICAgcmV0dXJuIHRoaXNcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgY3V1dG9tIGV2ZW50IGxpc3RlbmVyIHdpdGggaGFuZGxlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ3xBcnJheX0gZXZlbnRcclxuICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gaGFuZGxlclxyXG4gICAqIEByZXR1cm4ge0dsaWRlfVxyXG4gICAqL1xyXG4gIG9uIChldmVudCwgaGFuZGxlcikge1xyXG4gICAgdGhpcy5fZS5vbihldmVudCwgaGFuZGxlcilcclxuXHJcbiAgICByZXR1cm4gdGhpc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGdsaWRlIGlzIGEgcHJlY2lzZWQgdHlwZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSAge1N0cmluZ30gbmFtZVxyXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICovXHJcbiAgaXNUeXBlIChuYW1lKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy50eXBlID09PSBuYW1lXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHZhbHVlIG9mIHRoZSBjb3JlIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgZ2V0IHNldHRpbmdzICgpIHtcclxuICAgIHJldHVybiB0aGlzLl9vXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBjb3JlIG9wdGlvbnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9cclxuICAgKiBAcmV0dXJuIHtWb2lkfVxyXG4gICAqL1xyXG4gIHNldCBzZXR0aW5ncyAobykge1xyXG4gICAgaWYgKGlzT2JqZWN0KG8pKSB7XHJcbiAgICAgIHRoaXMuX28gPSBvXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3YXJuKCdPcHRpb25zIG11c3QgYmUgYW4gYG9iamVjdGAgaW5zdGFuY2UuJylcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgY3VycmVudCBpbmRleCBvZiB0aGUgc2xpZGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIGdldCBpbmRleCAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBjdXJyZW50IGluZGV4IGEgc2xpZGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqL1xyXG4gIHNldCBpbmRleCAoaSkge1xyXG4gICAgdGhpcy5faSA9IHRvSW50KGkpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHR5cGUgbmFtZSBvZiB0aGUgc2xpZGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldCB0eXBlICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnR5cGVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdmFsdWUgb2YgdGhlIGlkbGUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgKi9cclxuICBnZXQgZGlzYWJsZWQgKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdmFsdWUgb2YgdGhlIGlkbGUgc3RhdHVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgKi9cclxuICBzZXQgZGlzYWJsZWQgKHN0YXR1cykge1xyXG4gICAgdGhpcy5fZCA9ICEhc3RhdHVzXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNOdW1iZXIgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBSdW4gPSB7XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgYXV0b3J1bm5pbmcgb2YgdGhlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLl9vID0gZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgZ2xpZGVzIHJ1bm5pbmcgYmFzZWQgb24gdGhlIHBhc3NlZCBtb3Zpbmcgc2NoZW1hLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1vdmVcbiAgICAgKi9cbiAgICBtYWtlIChtb3ZlKSB7XG4gICAgICBpZiAoIUdsaWRlLmRpc2FibGVkKSB7XG4gICAgICAgICFHbGlkZS5zZXR0aW5ncy53YWl0Rm9yVHJhbnNpdGlvbiB8fCBHbGlkZS5kaXNhYmxlKClcblxuICAgICAgICB0aGlzLm1vdmUgPSBtb3ZlXG5cbiAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5iZWZvcmUnLCB0aGlzLm1vdmUpXG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGUoKVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdydW4nLCB0aGlzLm1vdmUpXG5cbiAgICAgICAgQ29tcG9uZW50cy5UcmFuc2l0aW9uLmFmdGVyKCgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc1N0YXJ0KCkpIHtcbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uc3RhcnQnLCB0aGlzLm1vdmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNFbmQoKSkge1xuICAgICAgICAgICAgRXZlbnRzLmVtaXQoJ3J1bi5lbmQnLCB0aGlzLm1vdmUpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuaXNPZmZzZXQoKSkge1xuICAgICAgICAgICAgdGhpcy5fbyA9IGZhbHNlXG5cbiAgICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4ub2Zmc2V0JywgdGhpcy5tb3ZlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIEV2ZW50cy5lbWl0KCdydW4uYWZ0ZXInLCB0aGlzLm1vdmUpXG5cbiAgICAgICAgICBHbGlkZS5lbmFibGUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIGN1cnJlbnQgaW5kZXggYmFzZWQgb24gZGVmaW5lZCBtb3ZlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfFVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBjYWxjdWxhdGUgKCkge1xuICAgICAgY29uc3QgeyBtb3ZlLCBsZW5ndGggfSA9IHRoaXNcbiAgICAgIGNvbnN0IHsgc3RlcHMsIGRpcmVjdGlvbiB9ID0gbW92ZVxuXG4gICAgICAvLyBCeSBkZWZhdWx0IGFzc3VtZSB0aGF0IHNpemUgb2YgdmlldyBpcyBlcXVhbCB0byBvbmUgc2xpZGVcbiAgICAgIGxldCB2aWV3U2l6ZSA9IDFcbiAgICAgIC8vIERldGVybWluZSBpZiBzdGVwcyBhcmUgbnVtZXJpYyB2YWx1ZVxuICAgICAgbGV0IGNvdW50YWJsZVN0ZXBzID0gaXNOdW1iZXIodG9JbnQoc3RlcHMpKSAmJiB0b0ludChzdGVwcykgIT09IDBcblxuICAgICAgLy8gV2hpbGUgZGlyZWN0aW9uIGlzIGA9YCB3ZSB3YW50IGp1bXAgdG9cbiAgICAgIC8vIGEgc3BlY2lmaWVkIGluZGV4IGRlc2NyaWJlZCBpbiBzdGVwcy5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc9Jykge1xuICAgICAgICBHbGlkZS5pbmRleCA9IHN0ZXBzXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gcGF0dGVybiBpcyBlcXVhbCB0byBgPj5gIHdlIHdhbnRcbiAgICAgIC8vIGZhc3QgZm9yd2FyZCB0byB0aGUgbGFzdCBzbGlkZS5cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc+JyAmJiBzdGVwcyA9PT0gJz4nKSB7XG4gICAgICAgIEdsaWRlLmluZGV4ID0gbGVuZ3RoXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gcGF0dGVybiBpcyBlcXVhbCB0byBgPDxgIHdlIHdhbnRcbiAgICAgIC8vIGZhc3QgZm9yd2FyZCB0byB0aGUgZmlyc3Qgc2xpZGUuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPCcgJiYgc3RlcHMgPT09ICc8Jykge1xuICAgICAgICBHbGlkZS5pbmRleCA9IDBcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gV2hpbGUgc3RlcHMgaXMgYSBudW1lcmljIHZhbHVlIGFuZCB3ZVxuICAgICAgLy8gbW92ZSBmb3J3YXJkIGJ5IHRoZSBudW1iZXIgb2Ygc3RlcHMuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSAnPicgJiYgY291bnRhYmxlU3RlcHMpIHtcbiAgICAgICAgdmlld1NpemUgPSB0b0ludChzdGVwcykgKiAtMVxuICAgICAgfVxuXG4gICAgICAvLyAkc3RlcHM8IChkcmFnKSBtb3ZlbWVudFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJzwnICYmIGNvdW50YWJsZVN0ZXBzKSB7XG4gICAgICAgIHZpZXdTaXplID0gdG9JbnQoc3RlcHMpXG4gICAgICB9XG5cbiAgICAgIC8vIHBhZ2luYXRpb24gbW92ZW1lbnRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd8Jykge1xuICAgICAgICB2aWV3U2l6ZSA9IEdsaWRlLnNldHRpbmdzLnBlclZpZXcgfHwgMVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBhcmUgbW92aW5nIGZvcndhcmRcbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICc+JyB8fCAoZGlyZWN0aW9uID09PSAnfCcgJiYgc3RlcHMgPT09ICc+JykpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBjYWxjdWxhdGVGb3J3YXJkSW5kZXgodmlld1NpemUpXG5cbiAgICAgICAgaWYgKGluZGV4ID4gbGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5fbyA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIEdsaWRlLmluZGV4ID0gbm9ybWFsaXplRm9yd2FyZEluZGV4KGluZGV4LCB2aWV3U2l6ZSlcblxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gd2UgYXJlIG1vdmluZyBiYWNrd2FyZFxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJzwnIHx8IChkaXJlY3Rpb24gPT09ICd8JyAmJiBzdGVwcyA9PT0gJzwnKSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IGNhbGN1bGF0ZUJhY2t3YXJkSW5kZXgodmlld1NpemUpXG5cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHRoaXMuX28gPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBHbGlkZS5pbmRleCA9IG5vcm1hbGl6ZUJhY2t3YXJkSW5kZXgoaW5kZXgsIHZpZXdTaXplKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB3YXJuKGBJbnZhbGlkIGRpcmVjdGlvbiBwYXR0ZXJuIFske2RpcmVjdGlvbn0ke3N0ZXBzfV0gaGFzIGJlZW4gdXNlZGApXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGZpcnN0IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1N0YXJ0ICgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA8PSAwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB3ZSBhcmUgb24gdGhlIGxhc3Qgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzRW5kICgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pbmRleCA+PSB0aGlzLmxlbmd0aFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgd2UgYXJlIG1ha2luZyBhIG9mZnNldCBydW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc09mZnNldCAoZGlyZWN0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIWRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5fb1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuX28pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIC8vIGRpZCB3ZSB2aWV3IHRvIHRoZSByaWdodD9cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd8PicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZS5kaXJlY3Rpb24gPT09ICd8JyAmJiB0aGlzLm1vdmUuc3RlcHMgPT09ICc+J1xuICAgICAgfVxuXG4gICAgICAvLyBkaWQgd2UgdmlldyB0byB0aGUgbGVmdD9cbiAgICAgIGlmIChkaXJlY3Rpb24gPT09ICd8PCcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubW92ZS5kaXJlY3Rpb24gPT09ICd8JyAmJiB0aGlzLm1vdmUuc3RlcHMgPT09ICc8J1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5tb3ZlLmRpcmVjdGlvbiA9PT0gZGlyZWN0aW9uXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiBib3VuZCBtb2RlIGlzIGFjdGl2ZVxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0JvdW5kICgpIHtcbiAgICAgIHJldHVybiBHbGlkZS5pc1R5cGUoJ3NsaWRlcicpICYmIEdsaWRlLnNldHRpbmdzLmZvY3VzQXQgIT09ICdjZW50ZXInICYmIEdsaWRlLnNldHRpbmdzLmJvdW5kXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaW5kZXggdmFsdWUgdG8gbW92ZSBmb3J3YXJkL3RvIHRoZSByaWdodFxuICAgKlxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUZvcndhcmRJbmRleCAodmlld1NpemUpIHtcbiAgICBjb25zdCB7IGluZGV4IH0gPSBHbGlkZVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgdmlld1NpemVcbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXggKyAodmlld1NpemUgLSAoaW5kZXggJSB2aWV3U2l6ZSkpXG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGUgZ2l2ZW4gZm9yd2FyZCBpbmRleCBiYXNlZCBvbiBnbGlkZSBzZXR0aW5ncywgcHJldmVudGluZyBpdCB0byBleGNlZWQgY2VydGFpbiBib3VuZGFyaWVzXG4gICAqXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gbGVuZ3RoXG4gICAqIEBwYXJhbSB2aWV3U2l6ZVxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgZnVuY3Rpb24gbm9ybWFsaXplRm9yd2FyZEluZGV4IChpbmRleCwgdmlld1NpemUpIHtcbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gUnVuXG5cbiAgICBpZiAoaW5kZXggPD0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gaW5kZXhcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICByZXR1cm4gaW5kZXggLSAobGVuZ3RoICsgMSlcbiAgICB9XG5cbiAgICBpZiAoR2xpZGUuc2V0dGluZ3MucmV3aW5kKSB7XG4gICAgICAvLyBib3VuZCBkb2VzIGZ1bm55IHRoaW5ncyB3aXRoIHRoZSBsZW5ndGgsIHRoZXJlZm9yIHdlIGhhdmUgdG8gYmUgY2VydGFpblxuICAgICAgLy8gdGhhdCB3ZSBhcmUgb24gdGhlIGxhc3QgcG9zc2libGUgaW5kZXggdmFsdWUgZ2l2ZW4gYnkgYm91bmRcbiAgICAgIGlmIChSdW4uaXNCb3VuZCgpICYmICFSdW4uaXNFbmQoKSkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgaWYgKFJ1bi5pc0JvdW5kKCkpIHtcbiAgICAgIHJldHVybiBsZW5ndGhcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5mbG9vcihsZW5ndGggLyB2aWV3U2l6ZSkgKiB2aWV3U2l6ZVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgaW5kZXggdmFsdWUgdG8gbW92ZSBiYWNrd2FyZC90byB0aGUgbGVmdFxuICAgKlxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUJhY2t3YXJkSW5kZXggKHZpZXdTaXplKSB7XG4gICAgY29uc3QgeyBpbmRleCB9ID0gR2xpZGVcblxuICAgIGlmIChHbGlkZS5pc1R5cGUoJ2Nhcm91c2VsJykpIHtcbiAgICAgIHJldHVybiBpbmRleCAtIHZpZXdTaXplXG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIG91ciBiYWNrIG5hdmlnYXRpb24gcmVzdWx0cyBpbiB0aGUgc2FtZSBpbmRleCBhcyBhIGZvcndhcmQgbmF2aWdhdGlvblxuICAgIC8vIHRvIGV4cGVyaWVuY2UgYSBob21vZ2VuZW91cyBwYWdpbmdcbiAgICBjb25zdCB2aWV3ID0gTWF0aC5jZWlsKGluZGV4IC8gdmlld1NpemUpXG5cbiAgICByZXR1cm4gKHZpZXcgLSAxKSAqIHZpZXdTaXplXG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplcyB0aGUgZ2l2ZW4gYmFja3dhcmQgaW5kZXggYmFzZWQgb24gZ2xpZGUgc2V0dGluZ3MsIHByZXZlbnRpbmcgaXQgdG8gZXhjZWVkIGNlcnRhaW4gYm91bmRhcmllc1xuICAgKlxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHBhcmFtIGxlbmd0aFxuICAgKiBAcGFyYW0gdmlld1NpemVcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBmdW5jdGlvbiBub3JtYWxpemVCYWNrd2FyZEluZGV4IChpbmRleCwgdmlld1NpemUpIHtcbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gUnVuXG5cbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgKGxlbmd0aCArIDEpXG4gICAgfVxuXG4gICAgaWYgKEdsaWRlLnNldHRpbmdzLnJld2luZCkge1xuICAgICAgLy8gYm91bmQgZG9lcyBmdW5ueSB0aGluZ3Mgd2l0aCB0aGUgbGVuZ3RoLCB0aGVyZWZvciB3ZSBoYXZlIHRvIGJlIGNlcnRhaW5cbiAgICAgIC8vIHRoYXQgd2UgYXJlIG9uIGZpcnN0IHBvc3NpYmxlIGluZGV4IHZhbHVlIGJlZm9yZSB3ZSB0byByZXdpbmQgdG8gdGhlIGxlbmd0aCBnaXZlbiBieSBib3VuZFxuICAgICAgaWYgKFJ1bi5pc0JvdW5kKCkgJiYgUnVuLmlzU3RhcnQoKSkge1xuICAgICAgICByZXR1cm4gbGVuZ3RoXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBNYXRoLmZsb29yKGxlbmd0aCAvIHZpZXdTaXplKSAqIHZpZXdTaXplXG4gICAgfVxuXG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIGRlZmluZShSdW4sICdtb3ZlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIG1vdmUgc2NoZW1hLlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX21cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgbW92ZSBzY2hlbWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGxldCBzdGVwID0gdmFsdWUuc3Vic3RyKDEpXG5cbiAgICAgIHRoaXMuX20gPSB7XG4gICAgICAgIGRpcmVjdGlvbjogdmFsdWUuc3Vic3RyKDAsIDEpLFxuICAgICAgICBzdGVwczogc3RlcCA/ICh0b0ludChzdGVwKSA/IHRvSW50KHN0ZXApIDogc3RlcCkgOiAwXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShSdW4sICdsZW5ndGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgcnVubmluZyBkaXN0YW5jZSBiYXNlZFxuICAgICAqIG9uIHplcm8taW5kZXhpbmcgbnVtYmVyIG9mIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHsgc2V0dGluZ3MgfSA9IEdsaWRlXG4gICAgICBsZXQgeyBsZW5ndGggfSA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNcblxuICAgICAgLy8gSWYgdGhlIGBib3VuZGAgb3B0aW9uIGlzIGFjdGl2ZSwgYSBtYXhpbXVtIHJ1bm5pbmcgZGlzdGFuY2Ugc2hvdWxkIGJlXG4gICAgICAvLyByZWR1Y2VkIGJ5IGBwZXJWaWV3YCBhbmQgYGZvY3VzQXRgIHNldHRpbmdzLiBSdW5uaW5nIGRpc3RhbmNlXG4gICAgICAvLyBzaG91bGQgZW5kIGJlZm9yZSBjcmVhdGluZyBhbiBlbXB0eSBzcGFjZSBhZnRlciBpbnN0YW5jZS5cbiAgICAgIGlmICh0aGlzLmlzQm91bmQoKSkge1xuICAgICAgICByZXR1cm4gKGxlbmd0aCAtIDEpIC0gKHRvSW50KHNldHRpbmdzLnBlclZpZXcpIC0gMSkgKyB0b0ludChzZXR0aW5ncy5mb2N1c0F0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGVuZ3RoIC0gMVxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoUnVuLCAnb2Zmc2V0Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgc3RhdHVzIG9mIHRoZSBvZmZzZXR0aW5nIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb1xuICAgIH1cbiAgfSlcblxuICByZXR1cm4gUnVuXG59XG4iLCIvKipcbiAqIFJldHVybnMgYSBjdXJyZW50IHRpbWUuXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbm93ICgpIHtcbiAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpXG59XG4iLCJpbXBvcnQgeyBub3cgfSBmcm9tICcuL3RpbWUnXG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWRcbiAqIGF0IG1vc3Qgb25jZSBkdXJpbmcgYSBnaXZlbiB3aW5kb3cgb2YgdGltZS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jXG4gKiBAcGFyYW0ge051bWJlcn0gd2FpdFxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3R0bGUgKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgbGV0IHRpbWVvdXQsIGNvbnRleHQsIGFyZ3MsIHJlc3VsdFxuICBsZXQgcHJldmlvdXMgPSAwXG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG5cbiAgbGV0IGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBub3coKVxuICAgIHRpbWVvdXQgPSBudWxsXG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsXG4gIH1cblxuICBsZXQgdGhyb3R0bGVkID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBhdCA9IG5vdygpXG4gICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IGF0XG4gICAgbGV0IHJlbWFpbmluZyA9IHdhaXQgLSAoYXQgLSBwcmV2aW91cylcbiAgICBjb250ZXh0ID0gdGhpc1xuICAgIGFyZ3MgPSBhcmd1bWVudHNcbiAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgICAgIHRpbWVvdXQgPSBudWxsXG4gICAgICB9XG4gICAgICBwcmV2aW91cyA9IGF0XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbFxuICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHRocm90dGxlZC5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpXG4gICAgcHJldmlvdXMgPSAwXG4gICAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHRocm90dGxlZFxufVxuIiwiaW1wb3J0IHsgdG9JbnQgfSBmcm9tICcuLi91dGlscy91bml0J1xuaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdGhyb3R0bGUgfSBmcm9tICcuLi91dGlscy93YWl0J1xuXG5jb25zdCBNQVJHSU5fVFlQRSA9IHtcbiAgbHRyOiBbJ21hcmdpbkxlZnQnLCAnbWFyZ2luUmlnaHQnXSxcbiAgcnRsOiBbJ21hcmdpblJpZ2h0JywgJ21hcmdpbkxlZnQnXVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBHYXBzID0ge1xuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZ2FwcyBiZXR3ZWVuIHNsaWRlcy4gRmlyc3QgYW5kIGxhc3RcbiAgICAgKiBzbGlkZXMgZG8gbm90IHJlY2VpdmUgaXQncyBlZGdlIG1hcmdpbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9ufSBzbGlkZXNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFwcGx5IChzbGlkZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzbGlkZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGV0IHN0eWxlID0gc2xpZGVzW2ldLnN0eWxlXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSBDb21wb25lbnRzLkRpcmVjdGlvbi52YWx1ZVxuXG4gICAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgICAgc3R5bGVbTUFSR0lOX1RZUEVbZGlyZWN0aW9uXVswXV0gPSBgJHt0aGlzLnZhbHVlIC8gMn1weGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzBdXSA9ICcnXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaSAhPT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBzdHlsZVtNQVJHSU5fVFlQRVtkaXJlY3Rpb25dWzFdXSA9IGAke3RoaXMudmFsdWUgLyAyfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0eWxlW01BUkdJTl9UWVBFW2RpcmVjdGlvbl1bMV1dID0gJydcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGdhcHMgZnJvbSB0aGUgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gc2xpZGVzXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgKi9cbiAgICByZW1vdmUgKHNsaWRlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNsaWRlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBsZXQgc3R5bGUgPSBzbGlkZXNbaV0uc3R5bGVcblxuICAgICAgICBzdHlsZS5tYXJnaW5MZWZ0ID0gJydcbiAgICAgICAgc3R5bGUubWFyZ2luUmlnaHQgPSAnJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShHYXBzLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgZ2FwLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIHRvSW50KEdsaWRlLnNldHRpbmdzLmdhcClcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEdhcHMsICdncm93Jywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYWRkaXRpb25hbCBkaW1lbnRpb25zIHZhbHVlIGNhdXNlZCBieSBnYXBzLlxuICAgICAqIFVzZWQgdG8gaW5jcmVhc2Ugd2lkdGggb2YgdGhlIHNsaWRlcyB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEdhcHMudmFsdWUgKiAoQ29tcG9uZW50cy5TaXplcy5sZW5ndGgpXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShHYXBzLCAncmVkdWN0b3InLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyByZWR1Y3Rpb24gdmFsdWUgY2F1c2VkIGJ5IGdhcHMuXG4gICAgICogVXNlZCB0byBzdWJ0cmFjdCB3aWR0aCBvZiB0aGUgc2xpZGVzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgbGV0IHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIHJldHVybiAoR2Fwcy52YWx1ZSAqIChwZXJWaWV3IC0gMSkpIC8gcGVyVmlld1xuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQXBwbHkgY2FsY3VsYXRlZCBnYXBzOlxuICAgKiAtIGFmdGVyIGJ1aWxkaW5nLCBzbyBzbGlkZXMgKGluY2x1ZGluZyBjbG9uZXMpIHdpbGwgcmVjZWl2ZSBwcm9wZXIgbWFyZ2luc1xuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEksIHRvIHJlY2FsY3VsYXRlIGdhcHMgd2l0aCBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYWZ0ZXInLCAndXBkYXRlJ10sIHRocm90dGxlKCgpID0+IHtcbiAgICBHYXBzLmFwcGx5KENvbXBvbmVudHMuSHRtbC53cmFwcGVyLmNoaWxkcmVuKVxuICB9LCAzMCkpXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBnYXBzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBHYXBzLnJlbW92ZShDb21wb25lbnRzLkh0bWwud3JhcHBlci5jaGlsZHJlbilcbiAgfSlcblxuICByZXR1cm4gR2Fwc1xufVxuIiwiLyoqXG4gKiBGaW5kcyBzaWJsaW5ncyBub2RlcyBvZiB0aGUgcGFzc2VkIG5vZGUuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaWJsaW5ncyAobm9kZSkge1xuICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcbiAgICBsZXQgbiA9IG5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkXG4gICAgbGV0IG1hdGNoZWQgPSBbXVxuXG4gICAgZm9yICg7IG47IG4gPSBuLm5leHRTaWJsaW5nKSB7XG4gICAgICBpZiAobi5ub2RlVHlwZSA9PT0gMSAmJiBuICE9PSBub2RlKSB7XG4gICAgICAgIG1hdGNoZWQucHVzaChuKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXRjaGVkXG4gIH1cblxuICByZXR1cm4gW11cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgcGFzc2VkIG5vZGUgZXhpc3QgYW5kIGlzIGEgdmFsaWQgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhpc3QgKG5vZGUpIHtcbiAgaWYgKG5vZGUgJiYgbm9kZSBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MRWxlbWVudCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi91dGlscy9sb2cnXG5pbXBvcnQgeyBleGlzdCB9IGZyb20gJy4uL3V0aWxzL2RvbSdcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IGlzU3RyaW5nIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuY29uc3QgVFJBQ0tfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWw9XCJ0cmFja1wiXSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIGNvbnN0IEh0bWwgPSB7XG4gICAgLyoqXG4gICAgICogU2V0dXAgc2xpZGVyIEhUTUwgbm9kZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0dsaWRlfSBnbGlkZVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMucm9vdCA9IEdsaWRlLnNlbGVjdG9yXG4gICAgICB0aGlzLnRyYWNrID0gdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoVFJBQ0tfU0VMRUNUT1IpXG4gICAgICB0aGlzLnNsaWRlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMud3JhcHBlci5jaGlsZHJlbikuZmlsdGVyKChzbGlkZSkgPT4ge1xuICAgICAgICByZXR1cm4gIXNsaWRlLmNsYXNzTGlzdC5jb250YWlucyhHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmNsb25lU2xpZGUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShIdG1sLCAncm9vdCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIG5vZGUgb2YgdGhlIGdsaWRlIG1haW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3JcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSBtYWluIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0IChyKSB7XG4gICAgICBpZiAoaXNTdHJpbmcocikpIHtcbiAgICAgICAgciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocilcbiAgICAgIH1cblxuICAgICAgaWYgKGV4aXN0KHIpKSB7XG4gICAgICAgIEh0bWwuX3IgPSByXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdSb290IGVsZW1lbnQgbXVzdCBiZSBhIGV4aXN0aW5nIEh0bWwgbm9kZScpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShIdG1sLCAndHJhY2snLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIEh0bWwuX3RcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBub2RlIG9mIHRoZSBnbGlkZSB0cmFjayB3aXRoIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBzZXQgKHQpIHtcbiAgICAgIGlmIChleGlzdCh0KSkge1xuICAgICAgICBIdG1sLl90ID0gdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2FybihgQ291bGQgbm90IGZpbmQgdHJhY2sgZWxlbWVudC4gUGxlYXNlIHVzZSAke1RSQUNLX1NFTEVDVE9SfSBhdHRyaWJ1dGUuYClcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKEh0bWwsICd3cmFwcGVyJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgbm9kZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBIdG1sLnRyYWNrLmNoaWxkcmVuWzBdXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBIdG1sXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5pbXBvcnQgeyB0b0ludCwgaXNPYmplY3QgfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBQZWVrID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBob3cgbXVjaCB0byBwZWVrIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gR2xpZGUuc2V0dGluZ3MucGVla1xuICAgIH1cbiAgfVxuXG4gIGRlZmluZShQZWVrLCAndmFsdWUnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB2YWx1ZSBvZiB0aGUgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ8T2JqZWN0fVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gUGVlay5fdlxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRoZSBwZWVrLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSB2YWx1ZVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5iZWZvcmUgPSB0b0ludCh2YWx1ZS5iZWZvcmUpXG4gICAgICAgIHZhbHVlLmFmdGVyID0gdG9JbnQodmFsdWUuYWZ0ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IHRvSW50KHZhbHVlKVxuICAgICAgfVxuXG4gICAgICBQZWVrLl92ID0gdmFsdWVcbiAgICB9XG4gIH0pXG5cbiAgZGVmaW5lKFBlZWssICdyZWR1Y3RvcicsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIHJlZHVjdGlvbiB2YWx1ZSBjYXVzZWQgYnkgcGVlay5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCB2YWx1ZSA9IFBlZWsudmFsdWVcbiAgICAgIGxldCBwZXJWaWV3ID0gR2xpZGUuc2V0dGluZ3MucGVyVmlld1xuXG4gICAgICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiAodmFsdWUuYmVmb3JlIC8gcGVyVmlldykgKyAodmFsdWUuYWZ0ZXIgLyBwZXJWaWV3KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWUgKiAyIC8gcGVyVmlld1xuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogUmVjYWxjdWxhdGUgcGVla2luZyBzaXplcyBvbjpcbiAgICogLSB3aGVuIHJlc2l6aW5nIHdpbmRvdyB0byB1cGRhdGUgdG8gcHJvcGVyIHBlcmNlbnRzXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBQZWVrLm1vdW50KClcbiAgfSlcblxuICByZXR1cm4gUGVla1xufVxuIiwiaW1wb3J0IHsgZGVmaW5lIH0gZnJvbSAnLi4vdXRpbHMvb2JqZWN0J1xuaW1wb3J0IHsgdG9JbnQsIGlzVW5kZWZpbmVkIH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgY29uc3QgTW92ZSA9IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIG1vdmUgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5fbyA9IDBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlcyBhIG1vdmVtZW50IHZhbHVlIGJhc2VkIG9uIHBhc3NlZCBvZmZzZXQgYW5kIGN1cnJlbnRseSBhY3RpdmUgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IG9mZnNldFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbWFrZSAob2Zmc2V0ID0gMCkge1xuICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXRcblxuICAgICAgRXZlbnRzLmVtaXQoJ21vdmUnLCB7XG4gICAgICAgIG1vdmVtZW50OiB0aGlzLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgICBFdmVudHMuZW1pdCgnbW92ZS5hZnRlcicsIHtcbiAgICAgICAgICBtb3ZlbWVudDogdGhpcy52YWx1ZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoTW92ZSwgJ29mZnNldCcsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIG9mZnNldCB2YWx1ZSB1c2VkIHRvIG1vZGlmeSBjdXJyZW50IHRyYW5zbGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIE1vdmUuX29cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhbiBvZmZzZXQgdmFsdWUgdXNlZCB0byBtb2RpZnkgY3VycmVudCB0cmFuc2xhdGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICovXG4gICAgc2V0ICh2YWx1ZSkge1xuICAgICAgTW92ZS5fbyA9ICFpc1VuZGVmaW5lZCh2YWx1ZSkgPyB0b0ludCh2YWx1ZSkgOiAwXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShNb3ZlLCAndHJhbnNsYXRlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYSByYXcgbW92ZW1lbnQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBHbGlkZS5pbmRleFxuICAgIH1cbiAgfSlcblxuICBkZWZpbmUoTW92ZSwgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgYW4gYWN0dWFsIG1vdmVtZW50IHZhbHVlIGNvcnJlY3RlZCBieSBvZmZzZXQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldFxuICAgICAgbGV0IHRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlXG5cbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIG9mZnNldFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlIC0gb2Zmc2V0XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBNYWtlIG1vdmVtZW50IHRvIHByb3BlciBzbGlkZSBvbjpcbiAgICogLSBiZWZvcmUgYnVpbGQsIHNvIGdsaWRlIHdpbGwgc3RhcnQgYXQgYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gb24gZWFjaCBzdGFuZGFyZCBydW4gdG8gbW92ZSB0byBuZXdseSBjYWxjdWxhdGVkIGluZGV4XG4gICAqL1xuICBFdmVudHMub24oWydidWlsZC5iZWZvcmUnLCAncnVuJ10sICgpID0+IHtcbiAgICBNb3ZlLm1ha2UoKVxuICB9KVxuXG4gIHJldHVybiBNb3ZlXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFNpemVzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHVwcyBkaW1lbnRpb25zIG9mIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0dXBTbGlkZXMgKCkge1xuICAgICAgbGV0IHdpZHRoID0gYCR7dGhpcy5zbGlkZVdpZHRofXB4YFxuICAgICAgbGV0IHNsaWRlcyA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlLndpZHRoID0gd2lkdGhcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0dXBzIGRpbWVudGlvbnMgb2Ygc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldHVwV3JhcHBlciAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS53aWR0aCA9IGAke3RoaXMud3JhcHBlclNpemV9cHhgXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYXBwbGllZCBzdHlsZXMgZnJvbSBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIGxldCBzbGlkZXMgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9ICcnXG4gICAgICB9XG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLndpZHRoID0gJydcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoU2l6ZXMsICdsZW5ndGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb3VudCBudW1iZXIgb2YgdGhlIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuSHRtbC5zbGlkZXMubGVuZ3RoXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShTaXplcywgJ3dpZHRoJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgd2lkdGggdmFsdWUgb2YgdGhlIHNsaWRlciAodmlzaWJsZSBhcmVhKS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIENvbXBvbmVudHMuSHRtbC5yb290Lm9mZnNldFdpZHRoXG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShTaXplcywgJ3dyYXBwZXJTaXplJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgc2l6ZSBvZiB0aGUgc2xpZGVzIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBTaXplcy5zbGlkZVdpZHRoICogU2l6ZXMubGVuZ3RoICsgQ29tcG9uZW50cy5HYXBzLmdyb3cgKyBDb21wb25lbnRzLkNsb25lcy5ncm93XG4gICAgfVxuICB9KVxuXG4gIGRlZmluZShTaXplcywgJ3NsaWRlV2lkdGgnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyB3aWR0aCB2YWx1ZSBvZiBhIHNpbmdsZSBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIChTaXplcy53aWR0aCAvIEdsaWRlLnNldHRpbmdzLnBlclZpZXcpIC0gQ29tcG9uZW50cy5QZWVrLnJlZHVjdG9yIC0gQ29tcG9uZW50cy5HYXBzLnJlZHVjdG9yXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBseSBjYWxjdWxhdGVkIGdsaWRlJ3MgZGltZW5zaW9uczpcbiAgICogLSBiZWZvcmUgYnVpbGRpbmcsIHNvIG90aGVyIGRpbWVudGlvbnMgKGUuZy4gdHJhbnNsYXRlKSB3aWxsIGJlIGNhbGN1bGF0ZWQgcHJvcGVydGx5XG4gICAqIC0gd2hlbiByZXNpemluZyB3aW5kb3cgdG8gcmVjYWxjdWxhdGUgc2lsZGVzIGRpbWVuc2lvbnNcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJLCB0byBjYWxjdWxhdGUgZGltZW5zaW9ucyBiYXNlZCBvbiBuZXcgb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnYnVpbGQuYmVmb3JlJywgJ3Jlc2l6ZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIFNpemVzLnNldHVwU2xpZGVzKClcbiAgICBTaXplcy5zZXR1cFdyYXBwZXIoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY2FsY3VsYXRlZCBnbGlkZSdzIGRpbWVuc2lvbnM6XG4gICAqIC0gb24gZGVzdG90aW5nIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgU2l6ZXMucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gU2l6ZXNcbn1cbiIsImltcG9ydCB7IHNpYmxpbmdzIH0gZnJvbSAnLi4vdXRpbHMvZG9tJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICBjb25zdCBCdWlsZCA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0IGdsaWRlIGJ1aWxkaW5nLiBBZGRzIGNsYXNzZXMsIHNldHNcbiAgICAgKiBkaW1lbnNpb25zIGFuZCBzZXR1cHMgaW5pdGlhbCBzdGF0ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgRXZlbnRzLmVtaXQoJ2J1aWxkLmJlZm9yZScpXG5cbiAgICAgIHRoaXMudHlwZUNsYXNzKClcbiAgICAgIHRoaXMuYWN0aXZlQ2xhc3MoKVxuXG4gICAgICBFdmVudHMuZW1pdCgnYnVpbGQuYWZ0ZXInKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGB0eXBlYCBjbGFzcyB0byB0aGUgZ2xpZGUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgdHlwZUNsYXNzICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyBhY3RpdmUgY2xhc3MgdG8gY3VycmVudCBzbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWN0aXZlQ2xhc3MgKCkge1xuICAgICAgbGV0IGNsYXNzZXMgPSBHbGlkZS5zZXR0aW5ncy5jbGFzc2VzXG4gICAgICBsZXQgc2xpZGUgPSBDb21wb25lbnRzLkh0bWwuc2xpZGVzW0dsaWRlLmluZGV4XVxuXG4gICAgICBpZiAoc2xpZGUpIHtcbiAgICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmFjdGl2ZVNsaWRlKVxuXG4gICAgICAgIHNpYmxpbmdzKHNsaWRlKS5mb3JFYWNoKChzaWJsaW5nKSA9PiB7XG4gICAgICAgICAgc2libGluZy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXMuYWN0aXZlU2xpZGUpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgSFRNTCBjbGFzc2VzIGFwcGxpZWQgYXQgYnVpbGRpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzZXMgKCkge1xuICAgICAgbGV0IGNsYXNzZXMgPSBHbGlkZS5zZXR0aW5ncy5jbGFzc2VzXG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3Nlc1tHbGlkZS5zZXR0aW5ncy50eXBlXSlcblxuICAgICAgQ29tcG9uZW50cy5IdG1sLnNsaWRlcy5mb3JFYWNoKChzaWJsaW5nKSA9PiB7XG4gICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzLmFjdGl2ZVNsaWRlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYnVpbGRpbmcgY2xhc3NlczpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICogLSBvbiB1cGRhdGluZyB0byByZW1vdmUgY2xhc3NlcyBiZWZvcmUgcmVtb3VudGluZyBjb21wb25lbnRcbiAgICovXG4gIEV2ZW50cy5vbihbJ2Rlc3Ryb3knLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBCdWlsZC5yZW1vdmVDbGFzc2VzKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnQ6XG4gICAqIC0gb24gcmVzaXppbmcgb2YgdGhlIHdpbmRvdyB0byBjYWxjdWxhdGUgbmV3IGRpbWVudGlvbnNcbiAgICogLSBvbiB1cGRhdGluZyBzZXR0aW5ncyB2aWEgQVBJXG4gICAqL1xuICBFdmVudHMub24oWydyZXNpemUnLCAndXBkYXRlJ10sICgpID0+IHtcbiAgICBCdWlsZC5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFN3YXAgYWN0aXZlIGNsYXNzIG9mIGN1cnJlbnQgc2xpZGU6XG4gICAqIC0gYWZ0ZXIgZWFjaCBtb3ZlIHRvIHRoZSBuZXcgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbignbW92ZS5hZnRlcicsICgpID0+IHtcbiAgICBCdWlsZC5hY3RpdmVDbGFzcygpXG4gIH0pXG5cbiAgcmV0dXJuIEJ1aWxkXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IENsb25lcyA9IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgcGF0dGVybiBtYXAgYW5kIGNvbGxlY3Qgc2xpZGVzIHRvIGJlIGNsb25lZC5cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLml0ZW1zID0gW11cblxuICAgICAgaWYgKEdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSkge1xuICAgICAgICB0aGlzLml0ZW1zID0gdGhpcy5jb2xsZWN0KClcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdCBjbG9uZXMgd2l0aCBwYXR0ZXJuLlxuICAgICAqXG4gICAgICogQHJldHVybiB7W119XG4gICAgICovXG4gICAgY29sbGVjdCAoaXRlbXMgPSBbXSkge1xuICAgICAgbGV0IHsgc2xpZGVzIH0gPSBDb21wb25lbnRzLkh0bWxcbiAgICAgIGxldCB7IHBlclZpZXcsIGNsYXNzZXMgfSA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGNvbnN0IHBlZWtJbmNyZW1lbnRlciA9ICshIUdsaWRlLnNldHRpbmdzLnBlZWtcbiAgICAgIGNvbnN0IGNsb25lQ291bnQgPSBwZXJWaWV3ICsgcGVla0luY3JlbWVudGVyICsgTWF0aC5yb3VuZChwZXJWaWV3IC8gMilcbiAgICAgIGNvbnN0IGFwcGVuZCA9IHNsaWRlcy5zbGljZSgwLCBjbG9uZUNvdW50KS5yZXZlcnNlKClcbiAgICAgIGNvbnN0IHByZXBlbmQgPSBzbGlkZXMuc2xpY2UoY2xvbmVDb3VudCAqIC0xKVxuXG4gICAgICBmb3IgKGxldCByID0gMDsgciA8IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocGVyVmlldyAvIHNsaWRlcy5sZW5ndGgpKTsgcisrKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXBwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGNsb25lID0gYXBwZW5kW2ldLmNsb25lTm9kZSh0cnVlKVxuXG4gICAgICAgICAgY2xvbmUuY2xhc3NMaXN0LmFkZChjbGFzc2VzLmNsb25lU2xpZGUpXG5cbiAgICAgICAgICBpdGVtcy5wdXNoKGNsb25lKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGNsb25lID0gcHJlcGVuZFtpXS5jbG9uZU5vZGUodHJ1ZSlcblxuICAgICAgICAgIGNsb25lLmNsYXNzTGlzdC5hZGQoY2xhc3Nlcy5jbG9uZVNsaWRlKVxuXG4gICAgICAgICAgaXRlbXMudW5zaGlmdChjbG9uZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXRlbXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIGNsb25lZCBzbGlkZXMgd2l0aCBnZW5lcmF0ZWQgcGF0dGVybi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYXBwZW5kICgpIHtcbiAgICAgIGxldCB7IGl0ZW1zIH0gPSB0aGlzXG4gICAgICBsZXQgeyB3cmFwcGVyLCBzbGlkZXMgfSA9IENvbXBvbmVudHMuSHRtbFxuXG4gICAgICBjb25zdCBoYWxmID0gTWF0aC5mbG9vcihpdGVtcy5sZW5ndGggLyAyKVxuICAgICAgY29uc3QgcHJlcGVuZCA9IGl0ZW1zLnNsaWNlKDAsIGhhbGYpLnJldmVyc2UoKVxuICAgICAgY29uc3QgYXBwZW5kID0gaXRlbXMuc2xpY2UoaGFsZiAqIC0xKS5yZXZlcnNlKClcbiAgICAgIGNvbnN0IHdpZHRoID0gYCR7Q29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRofXB4YFxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFwcGVuZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGFwcGVuZFtpXSlcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVwZW5kLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdyYXBwZXIuaW5zZXJ0QmVmb3JlKHByZXBlbmRbaV0sIHNsaWRlc1swXSlcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVtc1tpXS5zdHlsZS53aWR0aCA9IHdpZHRoXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhbGwgY2xvbmVkIHNsaWRlcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlICgpIHtcbiAgICAgIGxldCB7IGl0ZW1zIH0gPSB0aGlzXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIucmVtb3ZlQ2hpbGQoaXRlbXNbaV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKENsb25lcywgJ2dyb3cnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBhZGRpdGlvbmFsIGRpbWVudGlvbnMgdmFsdWUgY2F1c2VkIGJ5IGNsb25lcy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXQgKCkge1xuICAgICAgcmV0dXJuIChDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKyBDb21wb25lbnRzLkdhcHMudmFsdWUpICogQ2xvbmVzLml0ZW1zLmxlbmd0aFxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogQXBwZW5kIGFkZGl0aW9uYWwgc2xpZGUncyBjbG9uZXM6XG4gICAqIC0gd2hpbGUgZ2xpZGUncyB0eXBlIGlzIGBjYXJvdXNlbGBcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIENsb25lcy5yZW1vdmUoKVxuICAgIENsb25lcy5tb3VudCgpXG4gICAgQ2xvbmVzLmFwcGVuZCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEFwcGVuZCBhZGRpdGlvbmFsIHNsaWRlJ3MgY2xvbmVzOlxuICAgKiAtIHdoaWxlIGdsaWRlJ3MgdHlwZSBpcyBgY2Fyb3VzZWxgXG4gICAqL1xuICBFdmVudHMub24oJ2J1aWxkLmJlZm9yZScsICgpID0+IHtcbiAgICBpZiAoR2xpZGUuaXNUeXBlKCdjYXJvdXNlbCcpKSB7XG4gICAgICBDbG9uZXMuYXBwZW5kKClcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjbG9uZXMgSFRNTEVsZW1lbnRzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIEhUTUwgdG8gaXRzIGluaXRpYWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBDbG9uZXMucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gQ2xvbmVzXG59XG4iLCJpbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaXQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50c0JpbmRlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgYSBFdmVudHNCaW5kZXIgaW5zdGFuY2UuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAobGlzdGVuZXJzID0ge30pIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IGxpc3RlbmVyc1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZXZlbnRzIGxpc3RlbmVycyB0byBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtICB7U3RyaW5nfEFycmF5fSBldmVudHNcbiAgICogQHBhcmFtICB7RWxlbWVudHxXaW5kb3d8RG9jdW1lbnR9IGVsXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjbG9zdXJlXG4gICAqIEBwYXJhbSAge0Jvb2xlYW58T2JqZWN0fSBjYXB0dXJlXG4gICAqIEByZXR1cm4ge1ZvaWR9XG4gICAqL1xuICBvbiAoZXZlbnRzLCBlbCwgY2xvc3VyZSwgY2FwdHVyZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgIGV2ZW50cyA9IFtldmVudHNdXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50c1tpXV0gPSBjbG9zdXJlXG5cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBmcm9tIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0gIHtTdHJpbmd8QXJyYXl9IGV2ZW50c1xuICAgKiBAcGFyYW0gIHtFbGVtZW50fFdpbmRvd3xEb2N1bWVudH0gZWxcbiAgICogQHBhcmFtICB7Qm9vbGVhbnxPYmplY3R9IGNhcHR1cmVcbiAgICogQHJldHVybiB7Vm9pZH1cbiAgICovXG4gIG9mZiAoZXZlbnRzLCBlbCwgY2FwdHVyZSA9IGZhbHNlKSB7XG4gICAgaWYgKGlzU3RyaW5nKGV2ZW50cykpIHtcbiAgICAgIGV2ZW50cyA9IFtldmVudHNdXG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzLmxpc3RlbmVyc1tldmVudHNbaV1dLCBjYXB0dXJlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGNvbGxlY3RlZCBsaXN0ZW5lcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtWb2lkfVxuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzXG4gIH1cbn1cbiIsImltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcblxuaW1wb3J0IEV2ZW50c0JpbmRlciBmcm9tICcuLi9jb3JlL2V2ZW50L2V2ZW50cy1iaW5kZXInXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgY29uc3QgUmVzaXplID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHdpbmRvdyBiaW5kaW5ncy5cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLmJpbmQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBgcmV6c2l6ZWAgbGlzdGVuZXIgdG8gdGhlIHdpbmRvdy5cbiAgICAgKiBJdCdzIGEgY29zdGx5IGV2ZW50LCBzbyB3ZSBhcmUgZGVib3VuY2luZyBpdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ3Jlc2l6ZScsIHdpbmRvdywgdGhyb3R0bGUoKCkgPT4ge1xuICAgICAgICBFdmVudHMuZW1pdCgncmVzaXplJylcbiAgICAgIH0sIEdsaWRlLnNldHRpbmdzLnRocm90dGxlKSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kcyBsaXN0ZW5lcnMgZnJvbSB0aGUgd2luZG93LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZigncmVzaXplJywgd2luZG93KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSB3aW5kb3c6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gcmVtb3ZlIGFkZGVkIEV2ZW50TGlzdGVuZXJcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBSZXNpemUudW5iaW5kKClcbiAgICBCaW5kZXIuZGVzdHJveSgpXG4gIH0pXG5cbiAgcmV0dXJuIFJlc2l6ZVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcblxuY29uc3QgVkFMSURfRElSRUNUSU9OUyA9IFsnbHRyJywgJ3J0bCddXG5jb25zdCBGTElQRURfTU9WRU1FTlRTID0ge1xuICAnPic6ICc8JyxcbiAgJzwnOiAnPicsXG4gICc9JzogJz0nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IERpcmVjdGlvbiA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgZ2FwIHZhbHVlIGJhc2VkIG9uIHNldHRpbmdzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLnZhbHVlID0gR2xpZGUuc2V0dGluZ3MuZGlyZWN0aW9uXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc29sdmVzIHBhdHRlcm4gYmFzZWQgb24gZGlyZWN0aW9uIHZhbHVlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0dGVyblxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd9XG4gICAgICovXG4gICAgcmVzb2x2ZSAocGF0dGVybikge1xuICAgICAgbGV0IHRva2VuID0gcGF0dGVybi5zbGljZSgwLCAxKVxuXG4gICAgICBpZiAodGhpcy5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIHBhdHRlcm4uc3BsaXQodG9rZW4pLmpvaW4oRkxJUEVEX01PVkVNRU5UU1t0b2tlbl0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwYXR0ZXJuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyB2YWx1ZSBvZiBkaXJlY3Rpb24gbW9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpcyAoZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZSA9PT0gZGlyZWN0aW9uXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgZGlyZWN0aW9uIGNsYXNzIHRvIHRoZSByb290IEhUTUwgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWRkQ2xhc3MgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLnJvb3QuY2xhc3NMaXN0LmFkZChHbGlkZS5zZXR0aW5ncy5jbGFzc2VzLmRpcmVjdGlvblt0aGlzLnZhbHVlXSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBkaXJlY3Rpb24gY2xhc3MgZnJvbSB0aGUgcm9vdCBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZUNsYXNzICgpIHtcbiAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5kaXJlY3Rpb25bdGhpcy52YWx1ZV0pXG4gICAgfVxuICB9XG5cbiAgZGVmaW5lKERpcmVjdGlvbiwgJ3ZhbHVlJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgdGhlIGRpcmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBEaXJlY3Rpb24uX3ZcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB2YWx1ZSBvZiB0aGUgZGlyZWN0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBzZXQgKHZhbHVlKSB7XG4gICAgICBpZiAoVkFMSURfRElSRUNUSU9OUy5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgIERpcmVjdGlvbi5fdiA9IHZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKCdEaXJlY3Rpb24gdmFsdWUgbXVzdCBiZSBgbHRyYCBvciBgcnRsYCcpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBDbGVhciBkaXJlY3Rpb24gY2xhc3M6XG4gICAqIC0gb24gZGVzdHJveSB0byBicmluZyBIVE1MIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqIC0gb24gdXBkYXRlIHRvIHJlbW92ZSBjbGFzcyBiZWZvcmUgcmVhcHBsaW5nIGJlbGxvd1xuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIERpcmVjdGlvbi5yZW1vdmVDbGFzcygpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW91bnQgY29tcG9uZW50OlxuICAgKiAtIG9uIHVwZGF0ZSB0byByZWZsZWN0IGNoYW5nZXMgaW4gZGlyZWN0aW9uIHZhbHVlXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBEaXJlY3Rpb24ubW91bnQoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBBcHBseSBkaXJlY3Rpb24gY2xhc3M6XG4gICAqIC0gYmVmb3JlIGJ1aWxkaW5nIHRvIGFwcGx5IGNsYXNzIGZvciB0aGUgZmlyc3QgdGltZVxuICAgKiAtIG9uIHVwZGF0aW5nIHRvIHJlYXBwbHkgZGlyZWN0aW9uIGNsYXNzIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIERpcmVjdGlvbi5hZGRDbGFzcygpXG4gIH0pXG5cbiAgcmV0dXJuIERpcmVjdGlvblxufVxuIiwiLyoqXG4gKiBSZWZsZWN0cyB2YWx1ZSBvZiBnbGlkZSBtb3ZlbWVudC5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTmVnYXRlcyB0aGUgcGFzc2VkIHRyYW5zbGF0ZSBpZiBnbGlkZSBpcyBpbiBSVEwgb3B0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgcmV0dXJuIC10cmFuc2xhdGVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggYSBgZ2FwYCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTW9kaWZpZXMgcGFzc2VkIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIG51bWJlciBpbiB0aGUgYGdhcGAgc2V0dGluZ3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtb2RpZnkgKHRyYW5zbGF0ZSkge1xuICAgICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGguZmxvb3IodHJhbnNsYXRlIC8gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoKVxuICAgICAgcmV0dXJuIHRyYW5zbGF0ZSArIChDb21wb25lbnRzLkdhcHMudmFsdWUgKiBtdWx0aXBsaWVyKVxuICAgIH1cbiAgfVxufVxuIiwiLyoqXG4gKiBVcGRhdGVzIGdsaWRlIG1vdmVtZW50IHdpdGggd2lkdGggb2YgYWRkaXRpb25hbCBjbG9uZXMgd2lkdGguXG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBHbGlkZVxuICogQHBhcmFtICB7T2JqZWN0fSBDb21wb25lbnRzXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIEFkZHMgdG8gdGhlIHBhc3NlZCB0cmFuc2xhdGUgd2lkdGggb2YgdGhlIGhhbGYgb2YgY2xvbmVzLlxuICAgICAqXG4gICAgICogQHBhcmFtICB7TnVtYmVyfSB0cmFuc2xhdGVcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgbW9kaWZ5ICh0cmFuc2xhdGUpIHtcbiAgICAgIHJldHVybiB0cmFuc2xhdGUgKyAoQ29tcG9uZW50cy5DbG9uZXMuZ3JvdyAvIDIpXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4uLy4uL3V0aWxzL3VuaXQnXG5cbi8qKlxuICogVXBkYXRlcyBnbGlkZSBtb3ZlbWVudCB3aXRoIGEgYHBlZWtgIHNldHRpbmdzLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBNb2RpZmllcyBwYXNzZWQgdHJhbnNsYXRlIHZhbHVlIHdpdGggYSBgcGVla2Agc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuZm9jdXNBdCA+PSAwKSB7XG4gICAgICAgIGxldCBwZWVrID0gQ29tcG9uZW50cy5QZWVrLnZhbHVlXG5cbiAgICAgICAgaWYgKGlzT2JqZWN0KHBlZWspKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zbGF0ZSAtIHBlZWsuYmVmb3JlXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gcGVla1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlXG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIFVwZGF0ZXMgZ2xpZGUgbW92ZW1lbnQgd2l0aCBhIGBmb2N1c0F0YCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IEdsaWRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IENvbXBvbmVudHNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogTW9kaWZpZXMgcGFzc2VkIHRyYW5zbGF0ZSB2YWx1ZSB3aXRoIGluZGV4IGluIHRoZSBgZm9jdXNBdGAgc2V0dGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge051bWJlcn0gdHJhbnNsYXRlXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIG1vZGlmeSAodHJhbnNsYXRlKSB7XG4gICAgICBsZXQgZ2FwID0gQ29tcG9uZW50cy5HYXBzLnZhbHVlXG4gICAgICBsZXQgd2lkdGggPSBDb21wb25lbnRzLlNpemVzLndpZHRoXG4gICAgICBsZXQgZm9jdXNBdCA9IEdsaWRlLnNldHRpbmdzLmZvY3VzQXRcbiAgICAgIGxldCBzbGlkZVdpZHRoID0gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoXG5cbiAgICAgIGlmIChmb2N1c0F0ID09PSAnY2VudGVyJykge1xuICAgICAgICByZXR1cm4gdHJhbnNsYXRlIC0gKHdpZHRoIC8gMiAtIHNsaWRlV2lkdGggLyAyKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJhbnNsYXRlIC0gKHNsaWRlV2lkdGggKiBmb2N1c0F0KSAtIChnYXAgKiBmb2N1c0F0KVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tICcuLi91dGlscy91bml0J1xuXG5pbXBvcnQgUnRsIGZyb20gJy4vdHJhbnNmb3JtZXJzL3J0bCdcbmltcG9ydCBHYXAgZnJvbSAnLi90cmFuc2Zvcm1lcnMvZ2FwJ1xuaW1wb3J0IEdyb3cgZnJvbSAnLi90cmFuc2Zvcm1lcnMvZ3JvdydcbmltcG9ydCBQZWVraW5nIGZyb20gJy4vdHJhbnNmb3JtZXJzL3BlZWtpbmcnXG5pbXBvcnQgRm9jdXNpbmcgZnJvbSAnLi90cmFuc2Zvcm1lcnMvZm9jdXNpbmcnXG5cbi8qKlxuICogQXBwbGllcyBkaWZmcmVudCB0cmFuc2Zvcm1lcnMgb24gdHJhbnNsYXRlIHZhbHVlLlxuICpcbiAqIEBwYXJhbSAge09iamVjdH0gR2xpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gQ29tcG9uZW50c1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogTWVyZ2UgaW5zdGFuY2UgdHJhbnNmb3JtZXJzIHdpdGggY29sbGVjdGlvbiBvZiBkZWZhdWx0IHRyYW5zZm9ybWVycy5cbiAgICogSXQncyBpbXBvcnRhbnQgdGhhdCB0aGUgUnRsIGNvbXBvbmVudCBiZSBsYXN0IG9uIHRoZSBsaXN0LFxuICAgKiBzbyBpdCByZWZsZWN0cyBhbGwgcHJldmlvdXMgdHJhbnNmb3JtYXRpb25zLlxuICAgKlxuICAgKiBAdHlwZSB7QXJyYXl9XG4gICAqL1xuICBsZXQgVFJBTlNGT1JNRVJTID0gW1xuICAgIEdhcCxcbiAgICBHcm93LFxuICAgIFBlZWtpbmcsXG4gICAgRm9jdXNpbmdcbiAgXS5jb25jYXQoR2xpZGUuX3QsIFtSdGxdKVxuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogUGlwbGluZXMgdHJhbnNsYXRlIHZhbHVlIHdpdGggcmVnaXN0ZXJlZCB0cmFuc2Zvcm1lcnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHRyYW5zbGF0ZVxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBtdXRhdGUgKHRyYW5zbGF0ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBUUkFOU0ZPUk1FUlMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHRyYW5zZm9ybWVyID0gVFJBTlNGT1JNRVJTW2ldXG5cbiAgICAgICAgaWYgKGlzRnVuY3Rpb24odHJhbnNmb3JtZXIpICYmIGlzRnVuY3Rpb24odHJhbnNmb3JtZXIoKS5tb2RpZnkpKSB7XG4gICAgICAgICAgdHJhbnNsYXRlID0gdHJhbnNmb3JtZXIoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykubW9kaWZ5KHRyYW5zbGF0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3YXJuKCdUcmFuc2Zvcm1lciBzaG91bGQgYmUgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gb2JqZWN0IHdpdGggYG1vZGlmeSgpYCBtZXRob2QnKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmFuc2xhdGVcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBtdXRhdG9yIGZyb20gJy4uL211dGF0b3IvaW5kZXgnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIGNvbnN0IFRyYW5zbGF0ZSA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zbGF0ZSBvbiBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldCAodmFsdWUpIHtcbiAgICAgIGxldCB0cmFuc2Zvcm0gPSBtdXRhdG9yKEdsaWRlLCBDb21wb25lbnRzKS5tdXRhdGUodmFsdWUpXG5cbiAgICAgIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkey0xICogdHJhbnNmb3JtfXB4LCAwcHgsIDBweClgXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmFsdWUgb2YgdHJhbnNsYXRlIGZyb20gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmUgKCkge1xuICAgICAgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJydcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldFN0YXJ0SW5kZXggKCkge1xuICAgICAgY29uc3QgbGVuZ3RoID0gQ29tcG9uZW50cy5TaXplcy5sZW5ndGhcbiAgICAgIGNvbnN0IGluZGV4ID0gR2xpZGUuaW5kZXhcbiAgICAgIGNvbnN0IHBlclZpZXcgPSBHbGlkZS5zZXR0aW5ncy5wZXJWaWV3XG5cbiAgICAgIGlmIChDb21wb25lbnRzLlJ1bi5pc09mZnNldCgnPicpIHx8IENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCd8PicpKSB7XG4gICAgICAgIHJldHVybiBsZW5ndGggKyAoaW5kZXggLSBwZXJWaWV3KVxuICAgICAgfVxuXG4gICAgICAvLyBcIm1vZHVsbyBsZW5ndGhcIiBjb252ZXJ0cyBhbiBpbmRleCB0aGF0IGVxdWFscyBsZW5ndGggdG8gemVyb1xuICAgICAgcmV0dXJuIChpbmRleCArIHBlclZpZXcpICUgbGVuZ3RoXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBnZXRUcmF2ZWxEaXN0YW5jZSAoKSB7XG4gICAgICBjb25zdCB0cmF2ZWxEaXN0YW5jZSA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIEdsaWRlLnNldHRpbmdzLnBlclZpZXdcblxuICAgICAgaWYgKENvbXBvbmVudHMuUnVuLmlzT2Zmc2V0KCc+JykgfHwgQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoJ3w+JykpIHtcbiAgICAgICAgLy8gcmV2ZXJzZSB0cmF2ZWwgZGlzdGFuY2Ugc28gdGhhdCB3ZSBkb24ndCBoYXZlIHRvIGNoYW5nZSBzdWJ0cmFjdCBvcGVyYXRpb25zXG4gICAgICAgIHJldHVybiB0cmF2ZWxEaXN0YW5jZSAqIC0xXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cmF2ZWxEaXN0YW5jZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbmV3IHRyYW5zbGF0ZSB2YWx1ZTpcbiAgICogLSBvbiBtb3ZlIHRvIHJlZmxlY3QgaW5kZXggY2hhbmdlXG4gICAqIC0gb24gdXBkYXRpbmcgdmlhIEFQSSB0byByZWZsZWN0IHBvc3NpYmxlIGNoYW5nZXMgaW4gb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlJywgKGNvbnRleHQpID0+IHtcbiAgICBpZiAoIUdsaWRlLmlzVHlwZSgnY2Fyb3VzZWwnKSB8fCAhQ29tcG9uZW50cy5SdW4uaXNPZmZzZXQoKSkge1xuICAgICAgcmV0dXJuIFRyYW5zbGF0ZS5zZXQoY29udGV4dC5tb3ZlbWVudClcbiAgICB9XG5cbiAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgRXZlbnRzLmVtaXQoJ3RyYW5zbGF0ZS5qdW1wJylcblxuICAgICAgVHJhbnNsYXRlLnNldChDb21wb25lbnRzLlNpemVzLnNsaWRlV2lkdGggKiBHbGlkZS5pbmRleClcbiAgICB9KVxuXG4gICAgY29uc3Qgc3RhcnRXaWR0aCA9IENvbXBvbmVudHMuU2l6ZXMuc2xpZGVXaWR0aCAqIENvbXBvbmVudHMuVHJhbnNsYXRlLmdldFN0YXJ0SW5kZXgoKVxuICAgIHJldHVybiBUcmFuc2xhdGUuc2V0KHN0YXJ0V2lkdGggLSBDb21wb25lbnRzLlRyYW5zbGF0ZS5nZXRUcmF2ZWxEaXN0YW5jZSgpKVxuICB9KVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdHJhbnNsYXRlOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0YWwgc3RhdGVcbiAgICovXG4gIEV2ZW50cy5vbignZGVzdHJveScsICgpID0+IHtcbiAgICBUcmFuc2xhdGUucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gVHJhbnNsYXRlXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBIb2xkcyBpbmFjdGl2aXR5IHN0YXR1cyBvZiB0cmFuc2l0aW9uLlxuICAgKiBXaGVuIHRydWUgdHJhbnNpdGlvbiBpcyBub3QgYXBwbGllZC5cbiAgICpcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBsZXQgZGlzYWJsZWQgPSBmYWxzZVxuXG4gIGNvbnN0IFRyYW5zaXRpb24gPSB7XG4gICAgLyoqXG4gICAgICogQ29tcG9zZXMgc3RyaW5nIG9mIHRoZSBDU1MgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBjb21wb3NlIChwcm9wZXJ0eSkge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgICByZXR1cm4gYCR7cHJvcGVydHl9ICR7dGhpcy5kdXJhdGlvbn1tcyAke3NldHRpbmdzLmFuaW1hdGlvblRpbWluZ0Z1bmN9YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYCR7cHJvcGVydHl9IDBtcyAke3NldHRpbmdzLmFuaW1hdGlvblRpbWluZ0Z1bmN9YFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHZhbHVlIG9mIHRyYW5zaXRpb24gb24gSFRNTCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmc9fSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgc2V0IChwcm9wZXJ0eSA9ICd0cmFuc2Zvcm0nKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5jb21wb3NlKHByb3BlcnR5KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHZhbHVlIG9mIHRyYW5zaXRpb24gZnJvbSBIVE1MIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHJlbW92ZSAoKSB7XG4gICAgICBDb21wb25lbnRzLkh0bWwud3JhcHBlci5zdHlsZS50cmFuc2l0aW9uID0gJydcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUnVucyBjYWxsYmFjayBhZnRlciBhbmltYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFmdGVyIChjYWxsYmFjaykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH0sIHRoaXMuZHVyYXRpb24pXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZSB0cmFuc2l0aW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBlbmFibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSBmYWxzZVxuXG4gICAgICB0aGlzLnNldCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdHJhbnNpdGlvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZGlzYWJsZSAoKSB7XG4gICAgICBkaXNhYmxlZCA9IHRydWVcblxuICAgICAgdGhpcy5zZXQoKVxuICAgIH1cbiAgfVxuXG4gIGRlZmluZShUcmFuc2l0aW9uLCAnZHVyYXRpb24nLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBkdXJhdGlvbiBvZiB0aGUgdHJhbnNpdGlvbiBiYXNlZFxuICAgICAqIG9uIGN1cnJlbnRseSBydW5uaW5nIGFuaW1hdGlvbiB0eXBlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoR2xpZGUuaXNUeXBlKCdzbGlkZXInKSAmJiBDb21wb25lbnRzLlJ1bi5vZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHNldHRpbmdzLnJld2luZER1cmF0aW9uXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXR0aW5ncy5hbmltYXRpb25EdXJhdGlvblxuICAgIH1cbiAgfSlcblxuICAvKipcbiAgICogU2V0IHRyYW5zaXRpb24gYHN0eWxlYCB2YWx1ZTpcbiAgICogLSBvbiBlYWNoIG1vdmluZywgYmVjYXVzZSBpdCBtYXkgYmUgY2xlYXJlZCBieSBvZmZzZXQgbW92ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdtb3ZlJywgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24uc2V0KClcbiAgfSlcblxuICAvKipcbiAgICogRGlzYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIGJlZm9yZSBpbml0aWFsIGJ1aWxkIHRvIGF2b2lkIHRyYW5zaXRpb25pbmcgZnJvbSBgMGAgdG8gYHN0YXJ0QXRgIGluZGV4XG4gICAqIC0gd2hpbGUgcmVzaXppbmcgd2luZG93IGFuZCByZWNhbGN1bGF0aW5nIGRpbWVudGlvbnNcbiAgICogLSBvbiBqdW1waW5nIGZyb20gb2Zmc2V0IHRyYW5zaXRpb24gYXQgc3RhcnQgYW5kIGVuZCBlZGdlcyBpbiBgY2Fyb3VzZWxgIHR5cGVcbiAgICovXG4gIEV2ZW50cy5vbihbJ2J1aWxkLmJlZm9yZScsICdyZXNpemUnLCAndHJhbnNsYXRlLmp1bXAnXSwgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24uZGlzYWJsZSgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIEVuYWJsZSB0cmFuc2l0aW9uOlxuICAgKiAtIG9uIGVhY2ggcnVubmluZywgYmVjYXVzZSBpdCBtYXkgYmUgZGlzYWJsZWQgYnkgb2Zmc2V0IG1vdmVcbiAgICovXG4gIEV2ZW50cy5vbigncnVuJywgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24uZW5hYmxlKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3ZlIHRyYW5zaXRpb246XG4gICAqIC0gb24gZGVzdHJveWluZyB0byBicmluZyBtYXJrdXAgdG8gaXRzIGluaXRhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFRyYW5zaXRpb24ucmVtb3ZlKClcbiAgfSlcblxuICByZXR1cm4gVHJhbnNpdGlvblxufVxuIiwiLyoqXG4gKiBUZXN0IHZpYSBhIGdldHRlciBpbiB0aGUgb3B0aW9ucyBvYmplY3QgdG8gc2VlXG4gKiBpZiB0aGUgcGFzc2l2ZSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZC5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL0V2ZW50TGlzdGVuZXJPcHRpb25zL2Jsb2IvZ2gtcGFnZXMvZXhwbGFpbmVyLm1kI2ZlYXR1cmUtZGV0ZWN0aW9uXG4gKi9cblxubGV0IHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlXG5cbnRyeSB7XG4gIGxldCBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICBnZXQgKCkge1xuICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZVxuICAgIH1cbiAgfSlcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKVxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKVxufSBjYXRjaCAoZSkge31cblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydHNQYXNzaXZlXG4iLCJpbXBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWxzL3dhaXQnXG5pbXBvcnQgeyB0b0ludCwgdG9GbG9hdCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5pbXBvcnQgc3VwcG9ydHNQYXNzaXZlIGZyb20gJy4uL3V0aWxzL2RldGVjdC1wYXNzaXZlLWV2ZW50J1xuXG5pbXBvcnQgRXZlbnRzQmluZGVyIGZyb20gJy4uL2NvcmUvZXZlbnQvZXZlbnRzLWJpbmRlcidcblxuY29uc3QgU1RBUlRfRVZFTlRTID0gWyd0b3VjaHN0YXJ0JywgJ21vdXNlZG93biddXG5jb25zdCBNT1ZFX0VWRU5UUyA9IFsndG91Y2htb3ZlJywgJ21vdXNlbW92ZSddXG5jb25zdCBFTkRfRVZFTlRTID0gWyd0b3VjaGVuZCcsICd0b3VjaGNhbmNlbCcsICdtb3VzZXVwJywgJ21vdXNlbGVhdmUnXVxuY29uc3QgTU9VU0VfRVZFTlRTID0gWydtb3VzZWRvd24nLCAnbW91c2Vtb3ZlJywgJ21vdXNldXAnLCAnbW91c2VsZWF2ZSddXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgbGV0IHN3aXBlU2luID0gMFxuICBsZXQgc3dpcGVTdGFydFggPSAwXG4gIGxldCBzd2lwZVN0YXJ0WSA9IDBcbiAgbGV0IGRpc2FibGVkID0gZmFsc2VcbiAgbGV0IGNhcHR1cmUgPSAoc3VwcG9ydHNQYXNzaXZlKSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2VcblxuICBjb25zdCBTd2lwZSA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyBzd2lwZSBiaW5kaW5ncy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgdGhpcy5iaW5kU3dpcGVTdGFydCgpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZXN0YXJ0YCBldmVudC4gQ2FsY3VsYXRlcyBlbnRyeSBwb2ludHMgb2YgdGhlIHVzZXIncyB0YXAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0YXJ0IChldmVudCkge1xuICAgICAgaWYgKCFkaXNhYmxlZCAmJiAhR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKClcblxuICAgICAgICBsZXQgc3dpcGUgPSB0aGlzLnRvdWNoZXMoZXZlbnQpXG5cbiAgICAgICAgc3dpcGVTaW4gPSBudWxsXG4gICAgICAgIHN3aXBlU3RhcnRYID0gdG9JbnQoc3dpcGUucGFnZVgpXG4gICAgICAgIHN3aXBlU3RhcnRZID0gdG9JbnQoc3dpcGUucGFnZVkpXG5cbiAgICAgICAgdGhpcy5iaW5kU3dpcGVNb3ZlKClcbiAgICAgICAgdGhpcy5iaW5kU3dpcGVFbmQoKVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdzd2lwZS5zdGFydCcpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXIgZm9yIGBzd2lwZW1vdmVgIGV2ZW50LiBDYWxjdWxhdGVzIHVzZXIncyB0YXAgYW5nbGUgYW5kIGRpc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICovXG4gICAgbW92ZSAoZXZlbnQpIHtcbiAgICAgIGlmICghR2xpZGUuZGlzYWJsZWQpIHtcbiAgICAgICAgbGV0IHsgdG91Y2hBbmdsZSwgdG91Y2hSYXRpbywgY2xhc3NlcyB9ID0gR2xpZGUuc2V0dGluZ3NcblxuICAgICAgICBsZXQgc3dpcGUgPSB0aGlzLnRvdWNoZXMoZXZlbnQpXG5cbiAgICAgICAgbGV0IHN1YkV4U3ggPSB0b0ludChzd2lwZS5wYWdlWCkgLSBzd2lwZVN0YXJ0WFxuICAgICAgICBsZXQgc3ViRXlTeSA9IHRvSW50KHN3aXBlLnBhZ2VZKSAtIHN3aXBlU3RhcnRZXG4gICAgICAgIGxldCBwb3dFWCA9IE1hdGguYWJzKHN1YkV4U3ggPDwgMilcbiAgICAgICAgbGV0IHBvd0VZID0gTWF0aC5hYnMoc3ViRXlTeSA8PCAyKVxuICAgICAgICBsZXQgc3dpcGVIeXBvdGVudXNlID0gTWF0aC5zcXJ0KHBvd0VYICsgcG93RVkpXG4gICAgICAgIGxldCBzd2lwZUNhdGhldHVzID0gTWF0aC5zcXJ0KHBvd0VZKVxuXG4gICAgICAgIHN3aXBlU2luID0gTWF0aC5hc2luKHN3aXBlQ2F0aGV0dXMgLyBzd2lwZUh5cG90ZW51c2UpXG5cbiAgICAgICAgaWYgKHN3aXBlU2luICogMTgwIC8gTWF0aC5QSSA8IHRvdWNoQW5nbGUpIHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5Nb3ZlLm1ha2Uoc3ViRXhTeCAqIHRvRmxvYXQodG91Y2hSYXRpbykpXG5cbiAgICAgICAgICBDb21wb25lbnRzLkh0bWwucm9vdC5jbGFzc0xpc3QuYWRkKGNsYXNzZXMuZHJhZ2dpbmcpXG5cbiAgICAgICAgICBFdmVudHMuZW1pdCgnc3dpcGUubW92ZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgYHN3aXBlZW5kYCBldmVudC4gRmluaXRpYWxpemVzIHVzZXIncyB0YXAgYW5kIGRlY2lkZXMgYWJvdXQgZ2xpZGUgbW92ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBldmVudFxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgZW5kIChldmVudCkge1xuICAgICAgaWYgKCFHbGlkZS5kaXNhYmxlZCkge1xuICAgICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICAgIGxldCBzd2lwZSA9IHRoaXMudG91Y2hlcyhldmVudClcbiAgICAgICAgbGV0IHRocmVzaG9sZCA9IHRoaXMudGhyZXNob2xkKGV2ZW50KVxuXG4gICAgICAgIGxldCBzd2lwZURpc3RhbmNlID0gc3dpcGUucGFnZVggLSBzd2lwZVN0YXJ0WFxuICAgICAgICBsZXQgc3dpcGVEZWcgPSBzd2lwZVNpbiAqIDE4MCAvIE1hdGguUElcbiAgICAgICAgbGV0IHN0ZXBzID0gTWF0aC5yb3VuZChzd2lwZURpc3RhbmNlIC8gQ29tcG9uZW50cy5TaXplcy5zbGlkZVdpZHRoKVxuXG4gICAgICAgIHRoaXMuZW5hYmxlKClcblxuICAgICAgICBpZiAoc3dpcGVEaXN0YW5jZSA+IHRocmVzaG9sZCAmJiBzd2lwZURlZyA8IHNldHRpbmdzLnRvdWNoQW5nbGUpIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBwb3NpdGl2ZSBhbmQgZ3JlYXRlciB0aGFuIHRocmVzaG9sZCBtb3ZlIGJhY2t3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1pbihzdGVwcywgdG9JbnQoc2V0dGluZ3MucGVyVG91Y2gpKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChDb21wb25lbnRzLkRpcmVjdGlvbi5pcygncnRsJykpIHtcbiAgICAgICAgICAgIHN0ZXBzID0gLXN0ZXBzXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGA8JHtzdGVwc31gKSlcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBzd2lwZURpc3RhbmNlIDwgLXRocmVzaG9sZCAmJlxuICAgICAgICAgIHN3aXBlRGVnIDwgc2V0dGluZ3MudG91Y2hBbmdsZVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBXaGlsZSBzd2lwZSBpcyBuZWdhdGl2ZSBhbmQgbG93ZXIgdGhhbiBuZWdhdGl2ZSB0aHJlc2hvbGQgbW92ZSBmb3J3YXJkLlxuICAgICAgICAgIGlmIChzZXR0aW5ncy5wZXJUb3VjaCkge1xuICAgICAgICAgICAgc3RlcHMgPSBNYXRoLm1heChzdGVwcywgLXRvSW50KHNldHRpbmdzLnBlclRvdWNoKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoQ29tcG9uZW50cy5EaXJlY3Rpb24uaXMoJ3J0bCcpKSB7XG4gICAgICAgICAgICBzdGVwcyA9IC1zdGVwc1xuICAgICAgICAgIH1cblxuICAgICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZShgPiR7c3RlcHN9YCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2hpbGUgc3dpcGUgZG9uJ3QgcmVhY2ggZGlzdGFuY2UgYXBwbHkgcHJldmlvdXMgdHJhbnNmb3JtLlxuICAgICAgICAgIENvbXBvbmVudHMuTW92ZS5tYWtlKClcbiAgICAgICAgfVxuXG4gICAgICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5yZW1vdmUoc2V0dGluZ3MuY2xhc3Nlcy5kcmFnZ2luZylcblxuICAgICAgICB0aGlzLnVuYmluZFN3aXBlTW92ZSgpXG4gICAgICAgIHRoaXMudW5iaW5kU3dpcGVFbmQoKVxuXG4gICAgICAgIEV2ZW50cy5lbWl0KCdzd2lwZS5lbmQnKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBzd2lwZSdzIHN0YXJ0aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVTdGFydCAoKSB7XG4gICAgICBsZXQgc2V0dGluZ3MgPSBHbGlkZS5zZXR0aW5nc1xuXG4gICAgICBpZiAoc2V0dGluZ3Muc3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgQmluZGVyLm9uKFNUQVJUX0VWRU5UU1swXSwgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3RhcnQoZXZlbnQpXG4gICAgICAgIH0sIGNhcHR1cmUpXG4gICAgICB9XG5cbiAgICAgIGlmIChzZXR0aW5ncy5kcmFnVGhyZXNob2xkKSB7XG4gICAgICAgIEJpbmRlci5vbihTVEFSVF9FVkVOVFNbMV0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnN0YXJ0KGV2ZW50KVxuICAgICAgICB9LCBjYXB0dXJlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIHN3aXBlJ3Mgc3RhcnRpbmcgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZFN3aXBlU3RhcnQgKCkge1xuICAgICAgQmluZGVyLm9mZihTVEFSVF9FVkVOVFNbMF0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKVxuICAgICAgQmluZGVyLm9mZihTVEFSVF9FVkVOVFNbMV0sIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCBjYXB0dXJlKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBzd2lwZSdzIG1vdmluZyBldmVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZFN3aXBlTW92ZSAoKSB7XG4gICAgICBCaW5kZXIub24oTU9WRV9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCB0aHJvdHRsZSgoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5tb3ZlKGV2ZW50KVxuICAgICAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpLCBjYXB0dXJlKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIHN3aXBlJ3MgbW92aW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZU1vdmUgKCkge1xuICAgICAgQmluZGVyLm9mZihNT1ZFX0VWRU5UUywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIGNhcHR1cmUpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIHN3aXBlJ3MgZW5kaW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kU3dpcGVFbmQgKCkge1xuICAgICAgQmluZGVyLm9uKEVORF9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5lbmQoZXZlbnQpXG4gICAgICB9KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIHN3aXBlJ3MgZW5kaW5nIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmRTd2lwZUVuZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKEVORF9FVkVOVFMsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpemVzIGV2ZW50IHRvdWNoZXMgcG9pbnRzIGFjY29ydGluZyB0byBkaWZmZXJlbnQgdHlwZXMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnRcbiAgICAgKi9cbiAgICB0b3VjaGVzIChldmVudCkge1xuICAgICAgaWYgKE1PVVNFX0VWRU5UUy5pbmRleE9mKGV2ZW50LnR5cGUpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBldmVudC50b3VjaGVzWzBdIHx8IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgdmFsdWUgb2YgbWluaW11bSBzd2lwZSBkaXN0YW5jZSBzZXR0aW5ncyBiYXNlZCBvbiBldmVudCB0eXBlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIHRocmVzaG9sZCAoZXZlbnQpIHtcbiAgICAgIGxldCBzZXR0aW5ncyA9IEdsaWRlLnNldHRpbmdzXG5cbiAgICAgIGlmIChNT1VTRV9FVkVOVFMuaW5kZXhPZihldmVudC50eXBlKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBzZXR0aW5ncy5kcmFnVGhyZXNob2xkXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXR0aW5ncy5zd2lwZVRocmVzaG9sZFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHN3aXBlIGV2ZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBlbmFibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSBmYWxzZVxuXG4gICAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uZW5hYmxlKClcblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgc3dpcGUgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzZWxmfVxuICAgICAqL1xuICAgIGRpc2FibGUgKCkge1xuICAgICAgZGlzYWJsZWQgPSB0cnVlXG5cbiAgICAgIENvbXBvbmVudHMuVHJhbnNpdGlvbi5kaXNhYmxlKClcblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbXBvbmVudCBjbGFzczpcbiAgICogLSBhZnRlciBpbml0aWFsIGJ1aWxkaW5nXG4gICAqL1xuICBFdmVudHMub24oJ2J1aWxkLmFmdGVyJywgKCkgPT4ge1xuICAgIENvbXBvbmVudHMuSHRtbC5yb290LmNsYXNzTGlzdC5hZGQoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5zd2lwZWFibGUpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBzd2lwaW5nIGJpbmRpbmdzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIFN3aXBlLnVuYmluZFN3aXBlU3RhcnQoKVxuICAgIFN3aXBlLnVuYmluZFN3aXBlTW92ZSgpXG4gICAgU3dpcGUudW5iaW5kU3dpcGVFbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gU3dpcGVcbn1cbiIsImltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IEltYWdlcyA9IHtcbiAgICAvKipcbiAgICAgKiBCaW5kcyBsaXN0ZW5lciB0byBnbGlkZSB3cmFwcGVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBtb3VudCAoKSB7XG4gICAgICB0aGlzLmJpbmQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBgZHJhZ3N0YXJ0YCBldmVudCBvbiB3cmFwcGVyIHRvIHByZXZlbnQgZHJhZ2dpbmcgaW1hZ2VzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kICgpIHtcbiAgICAgIEJpbmRlci5vbignZHJhZ3N0YXJ0JywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRoaXMuZHJhZ3N0YXJ0KVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGBkcmFnc3RhcnRgIGV2ZW50IG9uIHdyYXBwZXIuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdkcmFnc3RhcnQnLCBDb21wb25lbnRzLkh0bWwud3JhcHBlcilcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlci4gUHJldmVudHMgZHJhZ2dpbmcuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGRyYWdzdGFydCAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGJpbmRpbmdzIGZyb20gaW1hZ2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIHJlbW92ZSBhZGRlZCBFdmVudExpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEltYWdlcy51bmJpbmQoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gSW1hZ2VzXG59XG4iLCJpbXBvcnQgeyBkZWZpbmUgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIC8qKlxuICAgKiBIb2xkcyBkZXRhY2hpbmcgc3RhdHVzIG9mIGFuY2hvcnMuXG4gICAqIFByZXZlbnRzIGRldGFjaGluZyBvZiBhbHJlYWR5IGRldGFjaGVkIGFuY2hvcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgbGV0IGRldGFjaGVkID0gZmFsc2VcblxuICAvKipcbiAgICogSG9sZHMgcHJldmVudGluZyBzdGF0dXMgb2YgYW5jaG9ycy5cbiAgICogSWYgYHRydWVgIHJlZGlyZWN0aW9uIGFmdGVyIGNsaWNrIHdpbGwgYmUgZGlzYWJsZWQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgbGV0IHByZXZlbnRlZCA9IGZhbHNlXG5cbiAgY29uc3QgQW5jaG9ycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXR1cHMgYSBpbml0aWFsIHN0YXRlIG9mIGFuY2hvcnMgY29tcG9uZW50LlxuICAgICAqXG4gICAgICogQHJldHVybnMge1ZvaWR9XG4gICAgICovXG4gICAgbW91bnQgKCkge1xuICAgICAgLyoqXG4gICAgICAgKiBIb2xkcyBjb2xsZWN0aW9uIG9mIGFuY2hvcnMgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fYSA9IENvbXBvbmVudHMuSHRtbC53cmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVxuXG4gICAgICB0aGlzLmJpbmQoKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBldmVudHMgdG8gYW5jaG9ycyBpbnNpZGUgYSB0cmFjay5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ2NsaWNrJywgQ29tcG9uZW50cy5IdG1sLndyYXBwZXIsIHRoaXMuY2xpY2spXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFVuYmluZHMgZXZlbnRzIGF0dGFjaGVkIHRvIGFuY2hvcnMgaW5zaWRlIGEgdHJhY2suXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoKSB7XG4gICAgICBCaW5kZXIub2ZmKCdjbGljaycsIENvbXBvbmVudHMuSHRtbC53cmFwcGVyKVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGZvciBjbGljayBldmVudC4gUHJldmVudHMgY2xpY2tzIHdoZW4gZ2xpZGUgaXMgaW4gYHByZXZlbnRgIHN0YXR1cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZXZlbnRcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGNsaWNrIChldmVudCkge1xuICAgICAgaWYgKHByZXZlbnRlZCkge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIGFuY2hvcnMgY2xpY2sgZXZlbnQgaW5zaWRlIGdsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7c2VsZn1cbiAgICAgKi9cbiAgICBkZXRhY2ggKCkge1xuICAgICAgcHJldmVudGVkID0gdHJ1ZVxuXG4gICAgICBpZiAoIWRldGFjaGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZHJhZ2dhYmxlID0gZmFsc2VcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2RhdGEtaHJlZicsXG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgdGhpcy5pdGVtc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKVxuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWNoZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIGFuY2hvcnMgY2xpY2sgZXZlbnRzIGluc2lkZSBnbGlkZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3NlbGZ9XG4gICAgICovXG4gICAgYXR0YWNoICgpIHtcbiAgICAgIHByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICAgIGlmIChkZXRhY2hlZCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRyYWdnYWJsZSA9IHRydWVcblxuICAgICAgICAgIHRoaXMuaXRlbXNbaV0uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2hyZWYnLFxuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaHJlZicpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgZGV0YWNoZWQgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxuXG4gIGRlZmluZShBbmNob3JzLCAnaXRlbXMnLCB7XG4gICAgLyoqXG4gICAgICogR2V0cyBjb2xsZWN0aW9uIG9mIHRoZSBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50W119XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIHJldHVybiBBbmNob3JzLl9hXG4gICAgfVxuICB9KVxuXG4gIC8qKlxuICAgKiBEZXRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIG9uIHN3aXBpbmcsIHNvIHRoZXkgd29uJ3QgcmVkaXJlY3QgdG8gaXRzIGBocmVmYCBhdHRyaWJ1dGVzXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLm1vdmUnLCAoKSA9PiB7XG4gICAgQW5jaG9ycy5kZXRhY2goKVxuICB9KVxuXG4gIC8qKlxuICAgKiBBdHRhY2ggYW5jaG9ycyBpbnNpZGUgc2xpZGVzOlxuICAgKiAtIGFmdGVyIHN3aXBpbmcgYW5kIHRyYW5zaXRpb25zIGVuZHMsIHNvIHRoZXkgY2FuIHJlZGlyZWN0IGFmdGVyIGNsaWNrIGFnYWluXG4gICAqL1xuICBFdmVudHMub24oJ3N3aXBlLmVuZCcsICgpID0+IHtcbiAgICBDb21wb25lbnRzLlRyYW5zaXRpb24uYWZ0ZXIoKCkgPT4ge1xuICAgICAgQW5jaG9ycy5hdHRhY2goKVxuICAgIH0pXG4gIH0pXG5cbiAgLyoqXG4gICAqIFVuYmluZCBhbmNob3JzIGluc2lkZSBzbGlkZXM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgYW5jaG9ycyB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEFuY2hvcnMuYXR0YWNoKClcbiAgICBBbmNob3JzLnVuYmluZCgpXG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBBbmNob3JzXG59XG4iLCJpbXBvcnQgeyBzaWJsaW5ncyB9IGZyb20gJy4uL3V0aWxzL2RvbSdcbmltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCBzdXBwb3J0c1Bhc3NpdmUgZnJvbSAnLi4vdXRpbHMvZGV0ZWN0LXBhc3NpdmUtZXZlbnQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5jb25zdCBOQVZfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWw9XCJjb250cm9sc1tuYXZdXCJdJ1xuY29uc3QgQ09OVFJPTFNfU0VMRUNUT1IgPSAnW2RhdGEtZ2xpZGUtZWxePVwiY29udHJvbHNcIl0nXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChHbGlkZSwgQ29tcG9uZW50cywgRXZlbnRzKSB7XG4gIC8qKlxuICAgKiBJbnN0YW5jZSBvZiB0aGUgYmluZGVyIGZvciBET00gRXZlbnRzLlxuICAgKlxuICAgKiBAdHlwZSB7RXZlbnRzQmluZGVyfVxuICAgKi9cbiAgY29uc3QgQmluZGVyID0gbmV3IEV2ZW50c0JpbmRlcigpXG5cbiAgbGV0IGNhcHR1cmUgPSAoc3VwcG9ydHNQYXNzaXZlKSA/IHsgcGFzc2l2ZTogdHJ1ZSB9IDogZmFsc2VcblxuICBjb25zdCBDb250cm9scyA9IHtcbiAgICAvKipcbiAgICAgKiBJbml0cyBhcnJvd3MuIEJpbmRzIGV2ZW50cyBsaXN0ZW5lcnNcbiAgICAgKiB0byB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIC8qKlxuICAgICAgICogQ29sbGVjdGlvbiBvZiBuYXZpZ2F0aW9uIEhUTUwgZWxlbWVudHMuXG4gICAgICAgKlxuICAgICAgICogQHByaXZhdGVcbiAgICAgICAqIEB0eXBlIHtIVE1MQ29sbGVjdGlvbn1cbiAgICAgICAqL1xuICAgICAgdGhpcy5fbiA9IENvbXBvbmVudHMuSHRtbC5yb290LnF1ZXJ5U2VsZWN0b3JBbGwoTkFWX1NFTEVDVE9SKVxuXG4gICAgICAvKipcbiAgICAgICAqIENvbGxlY3Rpb24gb2YgY29udHJvbHMgSFRNTCBlbGVtZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICogQHR5cGUge0hUTUxDb2xsZWN0aW9ufVxuICAgICAgICovXG4gICAgICB0aGlzLl9jID0gQ29tcG9uZW50cy5IdG1sLnJvb3QucXVlcnlTZWxlY3RvckFsbChDT05UUk9MU19TRUxFQ1RPUilcblxuICAgICAgdGhpcy5hZGRCaW5kaW5ncygpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgYWN0aXZlIGNsYXNzIHRvIGN1cnJlbnQgc2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHNldEFjdGl2ZSAoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyh0aGlzLl9uW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFjdGl2ZSBjbGFzcyB0byBjdXJyZW50IHNsaWRlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICByZW1vdmVBY3RpdmUgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3ModGhpcy5fbltpXS5jaGlsZHJlbilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBhY3RpdmUgY2xhc3Mgb24gaXRlbXMgaW5zaWRlIG5hdmlnYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gY29udHJvbHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGFkZENsYXNzIChjb250cm9scykge1xuICAgICAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcbiAgICAgIGxldCBpdGVtID0gY29udHJvbHNbR2xpZGUuaW5kZXhdXG5cbiAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChzZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdilcblxuICAgICAgICBzaWJsaW5ncyhpdGVtKS5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgIHNpYmxpbmcuY2xhc3NMaXN0LnJlbW92ZShzZXR0aW5ncy5jbGFzc2VzLmFjdGl2ZU5hdilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhY3RpdmUgY2xhc3MgZnJvbSBhY3RpdmUgY29udHJvbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBjb250cm9sc1xuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQ2xhc3MgKGNvbnRyb2xzKSB7XG4gICAgICBsZXQgaXRlbSA9IGNvbnRyb2xzW0dsaWRlLmluZGV4XVxuXG4gICAgICBpZiAoaXRlbSkge1xuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoR2xpZGUuc2V0dGluZ3MuY2xhc3Nlcy5hY3RpdmVOYXYpXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZHMgaGFuZGxlcyB0byB0aGUgZWFjaCBncm91cCBvZiBjb250cm9scy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYWRkQmluZGluZ3MgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuYmluZCh0aGlzLl9jW2ldLmNoaWxkcmVuKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGhhbmRsZXMgZnJvbSB0aGUgZWFjaCBncm91cCBvZiBjb250cm9scy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgcmVtb3ZlQmluZGluZ3MgKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudW5iaW5kKHRoaXMuX2NbaV0uY2hpbGRyZW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEJpbmRzIGV2ZW50cyB0byBhcnJvd3MgSFRNTCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7SFRNTENvbGxlY3Rpb259IGVsZW1lbnRzXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBiaW5kIChlbGVtZW50cykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBCaW5kZXIub24oJ2NsaWNrJywgZWxlbWVudHNbaV0sIHRoaXMuY2xpY2spXG4gICAgICAgIEJpbmRlci5vbigndG91Y2hzdGFydCcsIGVsZW1lbnRzW2ldLCB0aGlzLmNsaWNrLCBjYXB0dXJlKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVbmJpbmRzIGV2ZW50cyBiaW5kZWQgdG8gdGhlIGFycm93cyBIVE1MIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MQ29sbGVjdGlvbn0gZWxlbWVudHNcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHVuYmluZCAoZWxlbWVudHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgQmluZGVyLm9mZihbJ2NsaWNrJywgJ3RvdWNoc3RhcnQnXSwgZWxlbWVudHNbaV0pXG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYGNsaWNrYCBldmVudCBvbiB0aGUgYXJyb3dzIEhUTUwgZWxlbWVudHMuXG4gICAgICogTW92ZXMgc2xpZGVyIGluIGRyaWVjdGlvbiBwcmVjaXNlZCBpblxuICAgICAqIGBkYXRhLWdsaWRlLWRpcmAgYXR0cmlidXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBjbGljayAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZShDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlKGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWdsaWRlLWRpcicpKSlcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQ29udHJvbHMsICdpdGVtcycsIHtcbiAgICAvKipcbiAgICAgKiBHZXRzIGNvbGxlY3Rpb24gb2YgdGhlIGNvbnRyb2xzIEhUTUwgZWxlbWVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudFtdfVxuICAgICAqL1xuICAgIGdldCAoKSB7XG4gICAgICByZXR1cm4gQ29udHJvbHMuX2NcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFN3YXAgYWN0aXZlIGNsYXNzIG9mIGN1cnJlbnQgbmF2aWdhdGlvbiBpdGVtOlxuICAgKiAtIGFmdGVyIG1vdW50aW5nIHRvIHNldCBpdCB0byBpbml0aWFsIGluZGV4XG4gICAqIC0gYWZ0ZXIgZWFjaCBtb3ZlIHRvIHRoZSBuZXcgaW5kZXhcbiAgICovXG4gIEV2ZW50cy5vbihbJ21vdW50LmFmdGVyJywgJ21vdmUuYWZ0ZXInXSwgKCkgPT4ge1xuICAgIENvbnRyb2xzLnNldEFjdGl2ZSgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBiaW5kaW5ncyBhbmQgSFRNTCBDbGFzc2VzOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcsIHRvIGJyaW5nIG1hcmt1cCB0byBpdHMgaW5pdGlhbCBzdGF0ZVxuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIENvbnRyb2xzLnJlbW92ZUJpbmRpbmdzKClcbiAgICBDb250cm9scy5yZW1vdmVBY3RpdmUoKVxuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gQ29udHJvbHNcbn1cbiIsImltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IEtleWJvYXJkID0ge1xuICAgIC8qKlxuICAgICAqIEJpbmRzIGtleWJvYXJkIGV2ZW50cyBvbiBjb21wb25lbnQgbW91bnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5rZXlib2FyZCkge1xuICAgICAgICB0aGlzLmJpbmQoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGtleWJvYXJkIHByZXNzIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1ZvaWR9XG4gICAgICovXG4gICAgYmluZCAoKSB7XG4gICAgICBCaW5kZXIub24oJ2tleXVwJywgZG9jdW1lbnQsIHRoaXMucHJlc3MpXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMga2V5Ym9hcmQgcHJlc3MgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZigna2V5dXAnLCBkb2N1bWVudClcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBrZXlib2FyZCdzIGFycm93cyBwcmVzcyBhbmQgbW92aW5nIGdsaWRlIGZvd2FyZCBhbmQgYmFja3dhcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50XG4gICAgICogQHJldHVybiB7Vm9pZH1cbiAgICAgKi9cbiAgICBwcmVzcyAoZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOSkge1xuICAgICAgICBDb21wb25lbnRzLlJ1bi5tYWtlKENvbXBvbmVudHMuRGlyZWN0aW9uLnJlc29sdmUoJz4nKSlcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3KSB7XG4gICAgICAgIENvbXBvbmVudHMuUnVuLm1ha2UoQ29tcG9uZW50cy5EaXJlY3Rpb24ucmVzb2x2ZSgnPCcpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYmluZGluZ3MgZnJvbSBrZXlib2FyZDpcbiAgICogLSBvbiBkZXN0cm95aW5nIHRvIHJlbW92ZSBhZGRlZCBldmVudHNcbiAgICogLSBvbiB1cGRhdGluZyB0byByZW1vdmUgZXZlbnRzIGJlZm9yZSByZW1vdW50aW5nXG4gICAqL1xuICBFdmVudHMub24oWydkZXN0cm95JywgJ3VwZGF0ZSddLCAoKSA9PiB7XG4gICAgS2V5Ym9hcmQudW5iaW5kKClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBjb21wb25lbnRcbiAgICogLSBvbiB1cGRhdGluZyB0byByZWZsZWN0IHBvdGVudGlhbCBjaGFuZ2VzIGluIHNldHRpbmdzXG4gICAqL1xuICBFdmVudHMub24oJ3VwZGF0ZScsICgpID0+IHtcbiAgICBLZXlib2FyZC5tb3VudCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYmluZGVyOlxuICAgKiAtIG9uIGRlc3Ryb3lpbmcgdG8gcmVtb3ZlIGxpc3RlbmVyc1xuICAgKi9cbiAgRXZlbnRzLm9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIEJpbmRlci5kZXN0cm95KClcbiAgfSlcblxuICByZXR1cm4gS2V5Ym9hcmRcbn1cbiIsImltcG9ydCB7IGRlZmluZSB9IGZyb20gJy4uL3V0aWxzL29iamVjdCdcbmltcG9ydCB7IHRvSW50LCBpc1VuZGVmaW5lZCB9IGZyb20gJy4uL3V0aWxzL3VuaXQnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoR2xpZGUsIENvbXBvbmVudHMsIEV2ZW50cykge1xuICAvKipcbiAgICogSW5zdGFuY2Ugb2YgdGhlIGJpbmRlciBmb3IgRE9NIEV2ZW50cy5cbiAgICpcbiAgICogQHR5cGUge0V2ZW50c0JpbmRlcn1cbiAgICovXG4gIGNvbnN0IEJpbmRlciA9IG5ldyBFdmVudHNCaW5kZXIoKVxuXG4gIGNvbnN0IEF1dG9wbGF5ID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGF1dG9wbGF5aW5nIGFuZCBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIG1vdW50ICgpIHtcbiAgICAgIHRoaXMuc3RhcnQoKVxuXG4gICAgICBpZiAoR2xpZGUuc2V0dGluZ3MuaG92ZXJwYXVzZSkge1xuICAgICAgICB0aGlzLmJpbmQoKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgYXV0b3BsYXlpbmcgaW4gY29uZmlndXJlZCBpbnRlcnZhbC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbnxOdW1iZXJ9IGZvcmNlIFJ1biBhdXRvcGxheWluZyB3aXRoIHBhc3NlZCBpbnRlcnZhbCByZWdhcmRsZXNzIG9mIGBhdXRvcGxheWAgc2V0dGluZ3NcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0YXJ0ICgpIHtcbiAgICAgIGlmIChHbGlkZS5zZXR0aW5ncy5hdXRvcGxheSkge1xuICAgICAgICBpZiAoaXNVbmRlZmluZWQodGhpcy5faSkpIHtcbiAgICAgICAgICB0aGlzLl9pID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdG9wKClcblxuICAgICAgICAgICAgQ29tcG9uZW50cy5SdW4ubWFrZSgnPicpXG5cbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgICAgIH0sIHRoaXMudGltZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhdXRvcnVubmluZyBvZiB0aGUgZ2xpZGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIHN0b3AgKCkge1xuICAgICAgdGhpcy5faSA9IGNsZWFySW50ZXJ2YWwodGhpcy5faSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYXV0b3BsYXlpbmcgd2hpbGUgbW91c2UgaXMgb3ZlciBnbGlkZSdzIGFyZWEuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtWb2lkfVxuICAgICAqL1xuICAgIGJpbmQgKCkge1xuICAgICAgQmluZGVyLm9uKCdtb3VzZW92ZXInLCBDb21wb25lbnRzLkh0bWwucm9vdCwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3AoKVxuICAgICAgfSlcblxuICAgICAgQmluZGVyLm9uKCdtb3VzZW91dCcsIENvbXBvbmVudHMuSHRtbC5yb290LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnQoKVxuICAgICAgfSlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVW5iaW5kIG1vdXNlb3ZlciBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Vm9pZH1cbiAgICAgKi9cbiAgICB1bmJpbmQgKCkge1xuICAgICAgQmluZGVyLm9mZihbJ21vdXNlb3ZlcicsICdtb3VzZW91dCddLCBDb21wb25lbnRzLkh0bWwucm9vdClcbiAgICB9XG4gIH1cblxuICBkZWZpbmUoQXV0b3BsYXksICd0aW1lJywge1xuICAgIC8qKlxuICAgICAqIEdldHMgdGltZSBwZXJpb2QgdmFsdWUgZm9yIHRoZSBhdXRvcGxheSBpbnRlcnZhbC4gUHJpb3JpdGl6ZXNcbiAgICAgKiB0aW1lcyBpbiBgZGF0YS1nbGlkZS1hdXRvcGxheWAgYXR0cnVidXRlcyBvdmVyIG9wdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0ICgpIHtcbiAgICAgIGxldCBhdXRvcGxheSA9IENvbXBvbmVudHMuSHRtbC5zbGlkZXNbR2xpZGUuaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1nbGlkZS1hdXRvcGxheScpXG5cbiAgICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgICByZXR1cm4gdG9JbnQoYXV0b3BsYXkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b0ludChHbGlkZS5zZXR0aW5ncy5hdXRvcGxheSlcbiAgICB9XG4gIH0pXG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXlpbmcgYW5kIHVuYmluZCBldmVudHM6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gY2xlYXIgZGVmaW5lZCBpbnRlcnZhbFxuICAgKiAtIG9uIHVwZGF0aW5nIHZpYSBBUEkgdG8gcmVzZXQgaW50ZXJ2YWwgdGhhdCBtYXkgY2hhbmdlZFxuICAgKi9cbiAgRXZlbnRzLm9uKFsnZGVzdHJveScsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEF1dG9wbGF5LnVuYmluZCgpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFN0b3AgYXV0b3BsYXlpbmc6XG4gICAqIC0gYmVmb3JlIGVhY2ggcnVuLCB0byByZXN0YXJ0IGF1dG9wbGF5aW5nXG4gICAqIC0gb24gcGF1c2luZyB2aWEgQVBJXG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gY2xlYXIgZGVmaW5lZCBpbnRlcnZhbFxuICAgKiAtIHdoaWxlIHN0YXJ0aW5nIGEgc3dpcGVcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlc2V0IGludGVydmFsIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbihbJ3J1bi5iZWZvcmUnLCAncGF1c2UnLCAnZGVzdHJveScsICdzd2lwZS5zdGFydCcsICd1cGRhdGUnXSwgKCkgPT4ge1xuICAgIEF1dG9wbGF5LnN0b3AoKVxuICB9KVxuXG4gIC8qKlxuICAgKiBTdGFydCBhdXRvcGxheWluZzpcbiAgICogLSBhZnRlciBlYWNoIHJ1biwgdG8gcmVzdGFydCBhdXRvcGxheWluZ1xuICAgKiAtIG9uIHBsYXlpbmcgdmlhIEFQSVxuICAgKiAtIHdoaWxlIGVuZGluZyBhIHN3aXBlXG4gICAqL1xuICBFdmVudHMub24oWydydW4uYWZ0ZXInLCAncGxheScsICdzd2lwZS5lbmQnXSwgKCkgPT4ge1xuICAgIEF1dG9wbGF5LnN0YXJ0KClcbiAgfSlcblxuICAvKipcbiAgICogUmVtb3VudCBhdXRvcGxheWluZzpcbiAgICogLSBvbiB1cGRhdGluZyB2aWEgQVBJIHRvIHJlc2V0IGludGVydmFsIHRoYXQgbWF5IGNoYW5nZWRcbiAgICovXG4gIEV2ZW50cy5vbigndXBkYXRlJywgKCkgPT4ge1xuICAgIEF1dG9wbGF5Lm1vdW50KClcbiAgfSlcblxuICAvKipcbiAgICogRGVzdHJveSBhIGJpbmRlcjpcbiAgICogLSBvbiBkZXN0cm95aW5nIGdsaWRlIGluc3RhbmNlIHRvIGNsZWFydXAgbGlzdGVuZXJzXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQmluZGVyLmRlc3Ryb3koKVxuICB9KVxuXG4gIHJldHVybiBBdXRvcGxheVxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uL3V0aWxzL2xvZydcbmltcG9ydCB7IHRocm90dGxlIH0gZnJvbSAnLi4vdXRpbHMvd2FpdCdcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMvdW5pdCdcbmltcG9ydCB7IHNvcnRLZXlzLCBtZXJnZU9wdGlvbnMgfSBmcm9tICcuLi91dGlscy9vYmplY3QnXG5cbmltcG9ydCBFdmVudHNCaW5kZXIgZnJvbSAnLi4vY29yZS9ldmVudC9ldmVudHMtYmluZGVyJ1xuXG4vKipcbiAqIFNvcnRzIGtleXMgb2YgYnJlYWtwb2ludCBvYmplY3Qgc28gdGhleSB3aWxsIGJlIG9yZGVyZWQgZnJvbSBsb3dlciB0byBiaWdnZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBvaW50c1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gc29ydEJyZWFrcG9pbnRzIChwb2ludHMpIHtcbiAgaWYgKGlzT2JqZWN0KHBvaW50cykpIHtcbiAgICByZXR1cm4gc29ydEtleXMocG9pbnRzKVxuICB9IGVsc2Uge1xuICAgIHdhcm4oYEJyZWFrcG9pbnRzIG9wdGlvbiBtdXN0IGJlIGFuIG9iamVjdGApXG4gIH1cblxuICByZXR1cm4ge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKEdsaWRlLCBDb21wb25lbnRzLCBFdmVudHMpIHtcbiAgLyoqXG4gICAqIEluc3RhbmNlIG9mIHRoZSBiaW5kZXIgZm9yIERPTSBFdmVudHMuXG4gICAqXG4gICAqIEB0eXBlIHtFdmVudHNCaW5kZXJ9XG4gICAqL1xuICBjb25zdCBCaW5kZXIgPSBuZXcgRXZlbnRzQmluZGVyKClcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIHNldHRpbmdzLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgbGV0IHNldHRpbmdzID0gR2xpZGUuc2V0dGluZ3NcblxuICAvKipcbiAgICogSG9sZHMgcmVmZXJlbmNlIHRvIGJyZWFrcG9pbnRzIG9iamVjdCBpbiBzZXR0aW5ncy4gU29ydHMgYnJlYWtwb2ludHNcbiAgICogZnJvbSBzbWFsbGVyIHRvIGxhcmdlci4gSXQgaXMgcmVxdWlyZWQgaW4gb3JkZXIgdG8gcHJvcGVyXG4gICAqIG1hdGNoaW5nIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGxldCBwb2ludHMgPSBzb3J0QnJlYWtwb2ludHMoc2V0dGluZ3MuYnJlYWtwb2ludHMpXG5cbiAgLyoqXG4gICAqIENhY2hlIGluaXRpYWwgc2V0dGluZ3MgYmVmb3JlIG92ZXJ3cml0dGluZy5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIGxldCBkZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oe30sIHNldHRpbmdzKVxuXG4gIGNvbnN0IEJyZWFrcG9pbnRzID0ge1xuICAgIC8qKlxuICAgICAqIE1hdGNoZXMgc2V0dGluZ3MgZm9yIGN1cnJlY3RseSBtYXRjaGluZyBtZWRpYSBicmVha3BvaW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBvaW50c1xuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgbWF0Y2ggKHBvaW50cykge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cubWF0Y2hNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZm9yIChsZXQgcG9pbnQgaW4gcG9pbnRzKSB7XG4gICAgICAgICAgaWYgKHBvaW50cy5oYXNPd25Qcm9wZXJ0eShwb2ludCkpIHtcbiAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShgKG1heC13aWR0aDogJHtwb2ludH1weClgKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwb2ludHNbcG9pbnRdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0c1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVyd3JpdGUgaW5zdGFuY2Ugc2V0dGluZ3Mgd2l0aCBjdXJyZW50bHkgbWF0Y2hpbmcgYnJlYWtwb2ludCBzZXR0aW5ncy5cbiAgICogVGhpcyBoYXBwZW5zIHJpZ2h0IGFmdGVyIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbi5cbiAgICovXG4gIE9iamVjdC5hc3NpZ24oc2V0dGluZ3MsIEJyZWFrcG9pbnRzLm1hdGNoKHBvaW50cykpXG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBnbGlkZSB3aXRoIHNldHRpbmdzIG9mIG1hdGNoZWQgYnJla3BvaW50OlxuICAgKiAtIHdpbmRvdyByZXNpemUgdG8gdXBkYXRlIHNsaWRlclxuICAgKi9cbiAgQmluZGVyLm9uKCdyZXNpemUnLCB3aW5kb3csIHRocm90dGxlKCgpID0+IHtcbiAgICBHbGlkZS5zZXR0aW5ncyA9IG1lcmdlT3B0aW9ucyhzZXR0aW5ncywgQnJlYWtwb2ludHMubWF0Y2gocG9pbnRzKSlcbiAgfSwgR2xpZGUuc2V0dGluZ3MudGhyb3R0bGUpKVxuXG4gIC8qKlxuICAgKiBSZXNvcnQgYW5kIHVwZGF0ZSBkZWZhdWx0IHNldHRpbmdzOlxuICAgKiAtIG9uIHJlaW5pdCB2aWEgQVBJLCBzbyBicmVha3BvaW50IG1hdGNoaW5nIHdpbGwgYmUgcGVyZm9ybWVkIHdpdGggb3B0aW9uc1xuICAgKi9cbiAgRXZlbnRzLm9uKCd1cGRhdGUnLCAoKSA9PiB7XG4gICAgcG9pbnRzID0gc29ydEJyZWFrcG9pbnRzKHBvaW50cylcblxuICAgIGRlZmF1bHRzID0gT2JqZWN0LmFzc2lnbih7fSwgc2V0dGluZ3MpXG4gIH0pXG5cbiAgLyoqXG4gICAqIFVuYmluZCByZXNpemUgbGlzdGVuZXI6XG4gICAqIC0gb24gZGVzdHJveWluZywgdG8gYnJpbmcgbWFya3VwIHRvIGl0cyBpbml0aWFsIHN0YXRlXG4gICAqL1xuICBFdmVudHMub24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgQmluZGVyLm9mZigncmVzaXplJywgd2luZG93KVxuICB9KVxuXG4gIHJldHVybiBCcmVha3BvaW50c1xufVxuIiwiaW1wb3J0IENvcmUgZnJvbSAnLi4vc3JjL2luZGV4J1xuXG4vLyBSZXF1aXJlZCBjb21wb25lbnRzXG5pbXBvcnQgUnVuIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3J1bidcbmltcG9ydCBHYXBzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2dhcHMnXG5pbXBvcnQgSHRtbCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9odG1sJ1xuaW1wb3J0IFBlZWsgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvcGVlaydcbmltcG9ydCBNb3ZlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL21vdmUnXG5pbXBvcnQgU2l6ZXMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvc2l6ZXMnXG5pbXBvcnQgQnVpbGQgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYnVpbGQnXG5pbXBvcnQgQ2xvbmVzIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL2Nsb25lcydcbmltcG9ydCBSZXNpemUgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvcmVzaXplJ1xuaW1wb3J0IERpcmVjdGlvbiBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9kaXJlY3Rpb24nXG5pbXBvcnQgVHJhbnNsYXRlIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3RyYW5zbGF0ZSdcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJy4uL3NyYy9jb21wb25lbnRzL3RyYW5zaXRpb24nXG5cbi8vIE9wdGlvbmFsIGNvbXBvbmVudHNcbmltcG9ydCBTd2lwZSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9zd2lwZSdcbmltcG9ydCBJbWFnZXMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvaW1hZ2VzJ1xuaW1wb3J0IEFuY2hvcnMgZnJvbSAnLi4vc3JjL2NvbXBvbmVudHMvYW5jaG9ycydcbmltcG9ydCBDb250cm9scyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9jb250cm9scydcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9rZXlib2FyZCdcbmltcG9ydCBBdXRvcGxheSBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9hdXRvcGxheSdcbmltcG9ydCBCcmVha3BvaW50cyBmcm9tICcuLi9zcmMvY29tcG9uZW50cy9icmVha3BvaW50cydcblxuY29uc3QgQ09NUE9ORU5UUyA9IHtcbiAgLy8gUmVxdWlyZWRcbiAgSHRtbCxcbiAgVHJhbnNsYXRlLFxuICBUcmFuc2l0aW9uLFxuICBEaXJlY3Rpb24sXG4gIFBlZWssXG4gIFNpemVzLFxuICBHYXBzLFxuICBNb3ZlLFxuICBDbG9uZXMsXG4gIFJlc2l6ZSxcbiAgQnVpbGQsXG4gIFJ1bixcblxuICAvLyBPcHRpb25hbFxuICBTd2lwZSxcbiAgSW1hZ2VzLFxuICBBbmNob3JzLFxuICBDb250cm9scyxcbiAgS2V5Ym9hcmQsXG4gIEF1dG9wbGF5LFxuICBCcmVha3BvaW50c1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHbGlkZSBleHRlbmRzIENvcmUge1xuICBtb3VudCAoZXh0ZW5zaW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIHN1cGVyLm1vdW50KE9iamVjdC5hc3NpZ24oe30sIENPTVBPTkVOVFMsIGV4dGVuc2lvbnMpKVxuICB9XG59XG4iXSwibmFtZXMiOlsidHlwZSIsInN0YXJ0QXQiLCJwZXJWaWV3IiwiZm9jdXNBdCIsImdhcCIsImF1dG9wbGF5IiwiaG92ZXJwYXVzZSIsImtleWJvYXJkIiwiYm91bmQiLCJzd2lwZVRocmVzaG9sZCIsImRyYWdUaHJlc2hvbGQiLCJwZXJUb3VjaCIsInRvdWNoUmF0aW8iLCJ0b3VjaEFuZ2xlIiwiYW5pbWF0aW9uRHVyYXRpb24iLCJyZXdpbmQiLCJyZXdpbmREdXJhdGlvbiIsImFuaW1hdGlvblRpbWluZ0Z1bmMiLCJ3YWl0Rm9yVHJhbnNpdGlvbiIsInRocm90dGxlIiwiZGlyZWN0aW9uIiwicGVlayIsImJyZWFrcG9pbnRzIiwiY2xhc3NlcyIsImx0ciIsInJ0bCIsInNsaWRlciIsImNhcm91c2VsIiwic3dpcGVhYmxlIiwiZHJhZ2dpbmciLCJjbG9uZVNsaWRlIiwiYWN0aXZlTmF2IiwiYWN0aXZlU2xpZGUiLCJkaXNhYmxlZEFycm93Iiwid2FybiIsIm1zZyIsImNvbnNvbGUiLCJlcnJvciIsInRvSW50IiwidmFsdWUiLCJwYXJzZUludCIsInRvRmxvYXQiLCJwYXJzZUZsb2F0IiwiaXNTdHJpbmciLCJpc09iamVjdCIsImlzTnVtYmVyIiwiaXNGdW5jdGlvbiIsImlzVW5kZWZpbmVkIiwiaXNBcnJheSIsImNvbnN0cnVjdG9yIiwiQXJyYXkiLCJtb3VudCIsImdsaWRlIiwiZXh0ZW5zaW9ucyIsImV2ZW50cyIsImNvbXBvbmVudHMiLCJuYW1lIiwiZGVmaW5lIiwib2JqIiwicHJvcCIsImRlZmluaXRpb24iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInNvcnRLZXlzIiwia2V5cyIsInNvcnQiLCJyZWR1Y2UiLCJyIiwiayIsIm1lcmdlT3B0aW9ucyIsImRlZmF1bHRzIiwic2V0dGluZ3MiLCJvcHRpb25zIiwiYmFiZWxIZWxwZXJzLmV4dGVuZHMiLCJoYXNPd25Qcm9wZXJ0eSIsIkV2ZW50c0J1cyIsImhvcCIsImV2ZW50IiwiaGFuZGxlciIsImkiLCJsZW5ndGgiLCJvbiIsImNhbGwiLCJpbmRleCIsInB1c2giLCJyZW1vdmUiLCJjb250ZXh0IiwiZW1pdCIsImZvckVhY2giLCJpdGVtIiwiR2xpZGUiLCJzZWxlY3RvciIsIl9jIiwiX3QiLCJfZSIsImRpc2FibGVkIiwidHJhbnNmb3JtZXJzIiwicGF0dGVybiIsIlJ1biIsIm1ha2UiLCJkaXN0YW5jZSIsIlRyYW5zaXRpb24iLCJkaXNhYmxlIiwiTW92ZSIsImludGVydmFsIiwiX28iLCJvIiwiX2kiLCJfZCIsInN0YXR1cyIsIkNvbXBvbmVudHMiLCJFdmVudHMiLCJtb3ZlIiwiY2FsY3VsYXRlIiwiYWZ0ZXIiLCJpc1N0YXJ0IiwiaXNFbmQiLCJpc09mZnNldCIsImVuYWJsZSIsInN0ZXBzIiwidmlld1NpemUiLCJjb3VudGFibGVTdGVwcyIsImNhbGN1bGF0ZUZvcndhcmRJbmRleCIsIm5vcm1hbGl6ZUZvcndhcmRJbmRleCIsImNhbGN1bGF0ZUJhY2t3YXJkSW5kZXgiLCJub3JtYWxpemVCYWNrd2FyZEluZGV4IiwidW5kZWZpbmVkIiwiaXNCb3VuZCIsImlzVHlwZSIsIk1hdGgiLCJmbG9vciIsInZpZXciLCJjZWlsIiwiZ2V0IiwiX20iLCJzZXQiLCJzdGVwIiwic3Vic3RyIiwiSHRtbCIsInNsaWRlcyIsIm5vdyIsIkRhdGUiLCJnZXRUaW1lIiwiZnVuYyIsIndhaXQiLCJ0aW1lb3V0IiwiYXJncyIsInJlc3VsdCIsInByZXZpb3VzIiwibGF0ZXIiLCJsZWFkaW5nIiwiYXBwbHkiLCJ0aHJvdHRsZWQiLCJhdCIsInJlbWFpbmluZyIsImFyZ3VtZW50cyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwic2V0VGltZW91dCIsImNhbmNlbCIsIk1BUkdJTl9UWVBFIiwiR2FwcyIsImxlbiIsInN0eWxlIiwiRGlyZWN0aW9uIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwiU2l6ZXMiLCJ3cmFwcGVyIiwiY2hpbGRyZW4iLCJzaWJsaW5ncyIsIm5vZGUiLCJwYXJlbnROb2RlIiwibiIsImZpcnN0Q2hpbGQiLCJtYXRjaGVkIiwibmV4dFNpYmxpbmciLCJub2RlVHlwZSIsImV4aXN0Iiwid2luZG93IiwiSFRNTEVsZW1lbnQiLCJUUkFDS19TRUxFQ1RPUiIsInJvb3QiLCJ0cmFjayIsInF1ZXJ5U2VsZWN0b3IiLCJwcm90b3R5cGUiLCJzbGljZSIsImZpbHRlciIsInNsaWRlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJfciIsImRvY3VtZW50IiwidCIsIlBlZWsiLCJfdiIsImJlZm9yZSIsIm9mZnNldCIsIm1vdmVtZW50Iiwic2xpZGVXaWR0aCIsInRyYW5zbGF0ZSIsImlzIiwic2V0dXBTbGlkZXMiLCJ3aWR0aCIsInNldHVwV3JhcHBlciIsIndyYXBwZXJTaXplIiwib2Zmc2V0V2lkdGgiLCJncm93IiwiQ2xvbmVzIiwicmVkdWN0b3IiLCJCdWlsZCIsInR5cGVDbGFzcyIsImFjdGl2ZUNsYXNzIiwiYWRkIiwic2libGluZyIsInJlbW92ZUNsYXNzZXMiLCJpdGVtcyIsImNvbGxlY3QiLCJwZWVrSW5jcmVtZW50ZXIiLCJjbG9uZUNvdW50Iiwicm91bmQiLCJhcHBlbmQiLCJyZXZlcnNlIiwicHJlcGVuZCIsIm1heCIsImNsb25lIiwiY2xvbmVOb2RlIiwidW5zaGlmdCIsImhhbGYiLCJhcHBlbmRDaGlsZCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiRXZlbnRzQmluZGVyIiwibGlzdGVuZXJzIiwiZWwiLCJjbG9zdXJlIiwiY2FwdHVyZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQmluZGVyIiwiUmVzaXplIiwiYmluZCIsInVuYmluZCIsIm9mZiIsImRlc3Ryb3kiLCJWQUxJRF9ESVJFQ1RJT05TIiwiRkxJUEVEX01PVkVNRU5UUyIsInJlc29sdmUiLCJ0b2tlbiIsInNwbGl0Iiwiam9pbiIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJpbmRleE9mIiwibW9kaWZ5IiwibXVsdGlwbGllciIsIlRSQU5TRk9STUVSUyIsIkdhcCIsIkdyb3ciLCJQZWVraW5nIiwiRm9jdXNpbmciLCJjb25jYXQiLCJSdGwiLCJtdXRhdGUiLCJ0cmFuc2Zvcm1lciIsIlRyYW5zbGF0ZSIsInRyYW5zZm9ybSIsIm11dGF0b3IiLCJnZXRTdGFydEluZGV4IiwiZ2V0VHJhdmVsRGlzdGFuY2UiLCJ0cmF2ZWxEaXN0YW5jZSIsInN0YXJ0V2lkdGgiLCJjb21wb3NlIiwicHJvcGVydHkiLCJkdXJhdGlvbiIsInRyYW5zaXRpb24iLCJjYWxsYmFjayIsInN1cHBvcnRzUGFzc2l2ZSIsIm9wdHMiLCJlIiwiU1RBUlRfRVZFTlRTIiwiTU9WRV9FVkVOVFMiLCJFTkRfRVZFTlRTIiwiTU9VU0VfRVZFTlRTIiwic3dpcGVTaW4iLCJzd2lwZVN0YXJ0WCIsInN3aXBlU3RhcnRZIiwicGFzc2l2ZSIsIlN3aXBlIiwiYmluZFN3aXBlU3RhcnQiLCJzdGFydCIsInN3aXBlIiwidG91Y2hlcyIsInBhZ2VYIiwicGFnZVkiLCJiaW5kU3dpcGVNb3ZlIiwiYmluZFN3aXBlRW5kIiwic3ViRXhTeCIsInN1YkV5U3kiLCJwb3dFWCIsImFicyIsInBvd0VZIiwic3dpcGVIeXBvdGVudXNlIiwic3FydCIsInN3aXBlQ2F0aGV0dXMiLCJhc2luIiwiUEkiLCJzdG9wUHJvcGFnYXRpb24iLCJlbmQiLCJ0aHJlc2hvbGQiLCJzd2lwZURpc3RhbmNlIiwic3dpcGVEZWciLCJtaW4iLCJ1bmJpbmRTd2lwZU1vdmUiLCJ1bmJpbmRTd2lwZUVuZCIsInVuYmluZFN3aXBlU3RhcnQiLCJjaGFuZ2VkVG91Y2hlcyIsIkltYWdlcyIsImRyYWdzdGFydCIsInByZXZlbnREZWZhdWx0IiwiZGV0YWNoZWQiLCJwcmV2ZW50ZWQiLCJBbmNob3JzIiwiX2EiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2xpY2siLCJkZXRhY2giLCJkcmFnZ2FibGUiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRhY2giLCJOQVZfU0VMRUNUT1IiLCJDT05UUk9MU19TRUxFQ1RPUiIsIkNvbnRyb2xzIiwiX24iLCJhZGRCaW5kaW5ncyIsInNldEFjdGl2ZSIsInJlbW92ZUFjdGl2ZSIsImNvbnRyb2xzIiwicmVtb3ZlQmluZGluZ3MiLCJlbGVtZW50cyIsImN1cnJlbnRUYXJnZXQiLCJLZXlib2FyZCIsInByZXNzIiwia2V5Q29kZSIsIkF1dG9wbGF5Iiwic2V0SW50ZXJ2YWwiLCJzdG9wIiwidGltZSIsImNsZWFySW50ZXJ2YWwiLCJzb3J0QnJlYWtwb2ludHMiLCJwb2ludHMiLCJCcmVha3BvaW50cyIsIm1hdGNoIiwibWF0Y2hNZWRpYSIsInBvaW50IiwibWF0Y2hlcyIsIkNPTVBPTkVOVFMiLCJDb3JlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxpQkFBZTtFQUNiOzs7Ozs7Ozs7RUFTQUEsUUFBTSxRQVZPOztFQVliOzs7OztFQUtBQyxXQUFTLENBakJJOztFQW1CYjs7Ozs7RUFLQUMsV0FBUyxDQXhCSTs7RUEwQmI7Ozs7Ozs7OztFQVNBQyxXQUFTLENBbkNJOztFQXFDYjs7Ozs7RUFLQUMsT0FBSyxFQTFDUTs7RUE0Q2I7Ozs7O0VBS0FDLFlBQVUsS0FqREc7O0VBbURiOzs7OztFQUtBQyxjQUFZLElBeERDOztFQTBEYjs7Ozs7RUFLQUMsWUFBVSxJQS9ERzs7RUFpRWI7Ozs7Ozs7O0VBUUFDLFNBQU8sS0F6RU07O0VBMkViOzs7OztFQUtBQyxrQkFBZ0IsRUFoRkg7O0VBa0ZiOzs7OztFQUtBQyxpQkFBZSxHQXZGRjs7RUF5RmI7Ozs7O0VBS0FDLFlBQVUsS0E5Rkc7O0VBZ0diOzs7OztFQUtBQyxjQUFZLEdBckdDOztFQXVHYjs7Ozs7RUFLQUMsY0FBWSxFQTVHQzs7RUE4R2I7Ozs7O0VBS0FDLHFCQUFtQixHQW5ITjs7RUFxSGI7Ozs7O0VBS0FDLFVBQVEsSUExSEs7O0VBNEhiOzs7OztFQUtBQyxrQkFBZ0IsR0FqSUg7O0VBbUliOzs7OztFQUtBQyx1QkFBcUIsbUNBeElSOztFQTBJYjs7Ozs7RUFLQUMscUJBQW1CLElBL0lOOztFQWlKYjs7Ozs7RUFLQUMsWUFBVSxFQXRKRzs7RUF3SmI7Ozs7Ozs7OztFQVNBQyxhQUFXLEtBaktFOztFQW1LYjs7Ozs7Ozs7Ozs7O0VBWUFDLFFBQU0sQ0EvS087O0VBaUxiOzs7Ozs7Ozs7RUFTQUMsZUFBYSxFQTFMQTs7RUE0TGI7Ozs7OztFQU1BQyxXQUFTO0VBQ1BILGVBQVc7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
