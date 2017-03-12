;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-xiugai" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M921.6 1024 102.4 1024c-50.267022 0-91.022222-40.7552-91.022222-90.953956L11.377778 114.392178c0-50.221511 40.7552-90.976711 91.022222-90.976711l455.111111 0 60.689067 0L648.533333 23.415467c16.770844 0 30.333156 13.562311 30.333156 30.333156 0 16.770844-13.562311 30.3104-30.333156 30.3104l-30.333156 0L557.511111 84.059022 132.733156 84.059022c-33.496178 0-60.666311 27.170133-60.666311 60.643556l0 758.010311c0 33.473422 27.170133 60.643556 60.666311 60.643556l758.533689 0c33.496178 0 60.666311-27.170133 60.666311-60.643556L951.933156 417.609956 951.933156 362.473244l0-5.506844c0-16.770844 13.585067-30.3104 30.333156-30.3104 16.770844 0 30.333156 13.539556 30.333156 30.3104l0 60.643556 0 515.458844C1012.622222 983.267556 971.844267 1024 921.6 1024L921.6 1024zM426.211556 622.364444c-11.832889 11.855644-31.038578 11.855644-42.894222 0-11.855644-11.855644-11.855644-31.015822 0-42.871467l545.223111-547.862756c11.855644-11.855644 31.038578-11.855644 42.894222 0 11.855644 11.855644 11.855644 31.038578 0 42.871467L426.211556 622.364444 426.211556 622.364444z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)