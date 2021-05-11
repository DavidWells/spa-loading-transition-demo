/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;(function () {
  var support = { animations: true },
    container = document.getElementById('ip-container'),
    header = container.querySelector('header.ip-header'),
    loader = new PathLoader(document.getElementById('ip-loader-circle')),
    animEndEventName = 'animationend'

	console.log('anixmEndEventName', animEndEventName)
  function init() {
    var onEndInitialAnimation = function () {
			console.log('fire onEndInitialAnimation')
      if (support.animations) {
				console.log('remove onEndInitialAnimation listner')
        this.removeEventListener(animEndEventName, onEndInitialAnimation)
      }
			// Start fake loader
      startLoading()
    }

    // disable scrolling
    window.addEventListener('scroll', noscroll)

    // initial animation
    classie.add(container, 'loading')

    if (support.animations) {
			console.log('Add onEndInitialAnimation listener')
      container.addEventListener(animEndEventName, onEndInitialAnimation)
    } else {
      onEndInitialAnimation()
    }
  }

  function startLoading() {
    // simulate loading something..
    var simulationFn = function (instance) {
      var progress = 0,
        interval = setInterval(function () {
          progress = Math.min(progress + Math.random() * 0.1, 1)
					console.log('progress', progress)
          instance.setProgress(progress)
					
          // reached the end
          if (progress === 1) {
            classie.remove(container, 'loading')
            classie.add(container, 'loaded')
            clearInterval(interval)

            var onEndHeaderAnimation = function (ev) {
							console.log('run onEndHeaderAnimation')
              if (support.animations) {
                if (ev.target !== header) return
                this.removeEventListener(animEndEventName, onEndHeaderAnimation)
              }

              classie.add(document.body, 'layout-switch')
							console.log('remove scroll lock')
              window.removeEventListener('scroll', noscroll)
            }

            if (support.animations) {
							console.log('On end')
              header.addEventListener(animEndEventName, onEndHeaderAnimation)
            } else {
              onEndHeaderAnimation()
            }
          }
        }, 80)
    }

    loader.setProgressFn(simulationFn)
  }

  function noscroll() {
    window.scrollTo(0, 0)
  }

  init()
})()
