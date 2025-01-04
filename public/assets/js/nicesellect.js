/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by HernÃƒÆ’Ã‚Â¡n Sartorio  */
!(function (e) {
    e.fn.niceSelect = function (t) {
        function s(t) {
            t.after(
                e("<div></div>")
                    .addClass("nice-select")
                    .addClass(t.attr("class") || "")
                    .addClass(t.attr("disabled") ? "disabled" : "")
                    .attr("tabindex", t.attr("disabled") ? null : "0")
                    .html('<span class="current"></span><ul class="list"></ul>')
            );
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()),
                n.each(function (t) {
                    var n = e(this),
                        i = n.data("display");
                    s.find("ul").append(
                        e("<li></li>")
                            .attr("data-value", n.val())
                            .attr("data-display", i || null)
                            .addClass(
                                "option" +
                                    (n.is(":selected") ? " selected" : "") +
                                    (n.is(":disabled") ? " disabled" : "")
                            )
                            .html(n.text())
                    );
                });
        }
        if ("string" == typeof t)
            return (
                "update" == t
                    ? this.each(function () {
                          var t = e(this),
                              n = e(this).next(".nice-select"),
                              i = n.hasClass("open");
                          n.length &&
                              (n.remove(),
                              s(t),
                              i && t.next().trigger("click"));
                      })
                    : "destroy" == t
                    ? (this.each(function () {
                          var t = e(this),
                              s = e(this).next(".nice-select");
                          s.length && (s.remove(), t.css("display", ""));
                      }),
                      0 == e(".nice-select").length &&
                          e(document).off(".nice_select"))
                    : console.log('Method "' + t + '" does not exist.'),
                this
            );
        this.hide(),
            this.each(function () {
                var t = e(this);
                t.next().hasClass("nice-select") || s(t);
            }),
            e(document).off(".nice_select"),
            e(document).on("click.nice_select", ".nice-select", function (t) {
                var s = e(this);
                e(".nice-select").not(s).removeClass("open"),
                    s.toggleClass("open"),
                    s.hasClass("open")
                        ? (s.find(".option"),
                          s.find(".focus").removeClass("focus"),
                          s.find(".selected").addClass("focus"))
                        : s.focus();
            }),
            e(document).on("click.nice_select", function (t) {
                0 === e(t.target).closest(".nice-select").length &&
                    e(".nice-select").removeClass("open").find(".option");
            }),
            e(document).on(
                "click.nice_select",
                ".nice-select .option:not(.disabled)",
                function (t) {
                    var s = e(this),
                        n = s.closest(".nice-select");
                    n.find(".selected").removeClass("selected"),
                        s.addClass("selected");
                    var i = s.data("display") || s.text();
                    n.find(".current").text(i),
                        n.prev("select").val(s.data("value")).trigger("change");
                }
            ),
            e(document).on("keydown.nice_select", ".nice-select", function (t) {
                var s = e(this),
                    n = e(s.find(".focus") || s.find(".list .option.selected"));
                if (32 == t.keyCode || 13 == t.keyCode)
                    return (
                        s.hasClass("open")
                            ? n.trigger("click")
                            : s.trigger("click"),
                        !1
                    );
                if (40 == t.keyCode) {
                    if (s.hasClass("open")) {
                        var i = n.nextAll(".option:not(.disabled)").first();
                        i.length > 0 &&
                            (s.find(".focus").removeClass("focus"),
                            i.addClass("focus"));
                    } else s.trigger("click");
                    return !1;
                }
                if (38 == t.keyCode) {
                    if (s.hasClass("open")) {
                        var l = n.prevAll(".option:not(.disabled)").first();
                        l.length > 0 &&
                            (s.find(".focus").removeClass("focus"),
                            l.addClass("focus"));
                    } else s.trigger("click");
                    return !1;
                }
                if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
                else if (9 == t.keyCode && s.hasClass("open")) return !1;
            });
        var n = document.createElement("a").style;
        return (
            (n.cssText = "pointer-events:auto"),
            "auto" !== n.pointerEvents &&
                e("html").addClass("no-csspointerevents"),
            this
        );
    };
})(jQuery);

/*!
 * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2016 Edson Hilios
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!(function (a) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], a)
        : a(jQuery);
})(function (a) {
    "use strict";
    function b(a) {
        if (a instanceof Date) return a;
        if (String(a).match(g))
            return (
                String(a).match(/^[0-9]*$/) && (a = Number(a)),
                String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")),
                new Date(a)
            );
        throw new Error("Couldn't cast `" + a + "` to a date object.");
    }
    function c(a) {
        var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(b);
    }
    function d(a) {
        return function (b) {
            var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (d)
                for (var f = 0, g = d.length; f < g; ++f) {
                    var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
                        j = c(h[0]),
                        k = h[1] || "",
                        l = h[3] || "",
                        m = null;
                    (h = h[2]),
                        i.hasOwnProperty(h) && ((m = i[h]), (m = Number(a[m]))),
                        null !== m &&
                            ("!" === k && (m = e(l, m)),
                            "" === k && m < 10 && (m = "0" + m.toString()),
                            (b = b.replace(j, m.toString())));
                }
            return (b = b.replace(/%%/, "%"));
        };
    }
    function e(a, b) {
        var c = "s",
            d = "";
        return (
            a &&
                ((a = a.replace(/(:|;|\s)/gi, "").split(/\,/)),
                1 === a.length ? (c = a[0]) : ((d = a[0]), (c = a[1]))),
            Math.abs(b) > 1 ? c : d
        );
    }
    var f = [],
        g = [],
        h = { precision: 100, elapse: !1, defer: !1 };
    g.push(/^[0-9]*$/.source),
        g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
        g.push(
            /[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source
        ),
        (g = new RegExp(g.join("|")));
    var i = {
            Y: "years",
            m: "months",
            n: "daysToMonth",
            d: "daysToWeek",
            w: "weeks",
            W: "weeksToMonth",
            H: "hours",
            M: "minutes",
            S: "seconds",
            D: "totalDays",
            I: "totalHours",
            N: "totalMinutes",
            T: "totalSeconds",
        },
        j = function (b, c, d) {
            (this.el = b),
                (this.$el = a(b)),
                (this.interval = null),
                (this.offset = {}),
                (this.options = a.extend({}, h)),
                (this.firstTick = !0),
                (this.instanceNumber = f.length),
                f.push(this),
                this.$el.data("countdown-instance", this.instanceNumber),
                d &&
                    ("function" == typeof d
                        ? (this.$el.on("update.countdown", d),
                          this.$el.on("stoped.countdown", d),
                          this.$el.on("finish.countdown", d))
                        : (this.options = a.extend({}, h, d))),
                this.setFinalDate(c),
                this.options.defer === !1 && this.start();
        };
    a.extend(j.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var a = this;
            this.update(),
                (this.interval = setInterval(function () {
                    a.update.call(a);
                }, this.options.precision));
        },
        stop: function () {
            clearInterval(this.interval),
                (this.interval = null),
                this.dispatchEvent("stoped");
        },
        toggle: function () {
            this.interval ? this.stop() : this.start();
        },
        pause: function () {
            this.stop();
        },
        resume: function () {
            this.start();
        },
        remove: function () {
            this.stop.call(this),
                (f[this.instanceNumber] = null),
                delete this.$el.data().countdownInstance;
        },
        setFinalDate: function (a) {
            this.finalDate = b(a);
        },
        update: function () {
            if (0 === this.$el.closest("html").length)
                return void this.remove();
            var a,
                b = new Date();
            return (
                (a = this.finalDate.getTime() - b.getTime()),
                (a = Math.ceil(a / 1e3)),
                (a = !this.options.elapse && a < 0 ? 0 : Math.abs(a)),
                this.totalSecsLeft === a || this.firstTick
                    ? void (this.firstTick = !1)
                    : ((this.totalSecsLeft = a),
                      (this.elapsed = b >= this.finalDate),
                      (this.offset = {
                          seconds: this.totalSecsLeft % 60,
                          minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                          hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                          days:
                              Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                          daysToWeek:
                              Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                          daysToMonth: Math.floor(
                              (this.totalSecsLeft / 60 / 60 / 24) % 30.4368
                          ),
                          weeks: Math.floor(
                              this.totalSecsLeft / 60 / 60 / 24 / 7
                          ),
                          weeksToMonth:
                              Math.floor(
                                  this.totalSecsLeft / 60 / 60 / 24 / 7
                              ) % 4,
                          months: Math.floor(
                              this.totalSecsLeft / 60 / 60 / 24 / 30.4368
                          ),
                          years: Math.abs(
                              this.finalDate.getFullYear() - b.getFullYear()
                          ),
                          totalDays: Math.floor(
                              this.totalSecsLeft / 60 / 60 / 24
                          ),
                          totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                          totalMinutes: Math.floor(this.totalSecsLeft / 60),
                          totalSeconds: this.totalSecsLeft,
                      }),
                      void (this.options.elapse || 0 !== this.totalSecsLeft
                          ? this.dispatchEvent("update")
                          : (this.stop(), this.dispatchEvent("finish"))))
            );
        },
        dispatchEvent: function (b) {
            var c = a.Event(b + ".countdown");
            (c.finalDate = this.finalDate),
                (c.elapsed = this.elapsed),
                (c.offset = a.extend({}, this.offset)),
                (c.strftime = d(this.offset)),
                this.$el.trigger(c);
        },
    }),
        (a.fn.countdown = function () {
            var b = Array.prototype.slice.call(arguments, 0);
            return this.each(function () {
                var c = a(this).data("countdown-instance");
                if (void 0 !== c) {
                    var d = f[c],
                        e = b[0];
                    j.prototype.hasOwnProperty(e)
                        ? d[e].apply(d, b.slice(1))
                        : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)
                        ? (d.setFinalDate.call(d, e), d.start())
                        : a.error(
                              "Method %s does not exist on jQuery.countdown".replace(
                                  /\%s/gi,
                                  e
                              )
                          );
                } else new j(this, b[0], b[1]);
            });
        });
});

/*!
 * jquery.counterup.js 1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Date: Nov 26, 2013
 */ (function (e) {
    "use strict";
    e.fn.counterUp = function (t) {
        var n = e.extend({ time: 400, delay: 10 }, t);
        return this.each(function () {
            var t = e(this),
                r = n,
                i = function () {
                    var e = [],
                        n = r.time / r.delay,
                        i = t.text(),
                        s = /[0-9]+,[0-9]+/.test(i);
                    i = i.replace(/,/g, "");
                    var o = /^[0-9]+$/.test(i),
                        u = /^[0-9]+\.[0-9]+$/.test(i),
                        a = u ? (i.split(".")[1] || []).length : 0;
                    for (var f = n; f >= 1; f--) {
                        var l = parseInt((i / n) * f);
                        u && (l = parseFloat((i / n) * f).toFixed(a));
                        if (s)
                            while (/(\d+)(\d{3})/.test(l.toString()))
                                l = l
                                    .toString()
                                    .replace(/(\d+)(\d{3})/, "$1,$2");
                        e.unshift(l);
                    }
                    t.data("counterup-nums", e);
                    t.text("0");
                    var c = function () {
                        t.text(t.data("counterup-nums").shift());
                        if (t.data("counterup-nums").length)
                            setTimeout(t.data("counterup-func"), r.delay);
                        else {
                            delete t.data("counterup-nums");
                            t.data("counterup-nums", null);
                            t.data("counterup-func", null);
                        }
                    };
                    t.data("counterup-func", c);
                    setTimeout(t.data("counterup-func"), r.delay);
                };
            t.waypoint(i, { offset: "100%", triggerOnce: !0 });
        });
    };
})(jQuery);

// Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
    var t =
            [].indexOf ||
            function (t) {
                for (var e = 0, n = this.length; e < n; e++) {
                    if (e in this && this[e] === t) return e;
                }
                return -1;
            },
        e = [].slice;
    (function (t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (n) {
                return e(n, t);
            });
        } else {
            return e(t.jQuery, t);
        }
    })(this, function (n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = { horizontal: {}, vertical: {} };
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = (function () {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = { x: t.scrollLeft(), y: t.scrollTop() };
                this.waypoints = { horizontal: {}, vertical: {} };
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function () {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function () {
                            e.doScroll();
                            return (e.didScroll = false);
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle);
                    }
                });
                t.bind(p, function () {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function () {
                            n[m]("refresh");
                            return (e.didResize = false);
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle);
                    }
                });
            }
            t.prototype.doScroll = function () {
                var t,
                    e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                    },
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh");
                }
                n.each(t, function (t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function (t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e);
                        } else if (
                            r.newScroll < (i = e.offset) &&
                            i <= r.oldScroll
                        ) {
                            return l.push(e);
                        }
                    });
                    l.sort(function (t, e) {
                        return t.offset - e.offset;
                    });
                    if (!o) {
                        l.reverse();
                    }
                    return n.each(l, function (t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i]);
                        }
                    });
                });
                return (this.oldScroll = {
                    x: t.horizontal.newScroll,
                    y: t.vertical.newScroll,
                });
            };
            t.prototype.refresh = function () {
                var t,
                    e,
                    r,
                    i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left",
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r
                            ? n[m]("viewportHeight")
                            : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top",
                    },
                };
                return n.each(t, function (t, e) {
                    return n.each(i.waypoints[t], function (t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element)
                            ? 0
                            : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element);
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil((e.contextDimension * i) / 100);
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (
                            (r.options.onlyOnScroll && l != null) ||
                            !r.enabled
                        ) {
                            return;
                        }
                        if (
                            l !== null &&
                            l < (s = e.oldScroll) &&
                            s <= r.offset
                        ) {
                            return r.trigger([e.backward]);
                        } else if (
                            l !== null &&
                            l > (f = e.oldScroll) &&
                            f >= r.offset
                        ) {
                            return r.trigger([e.forward]);
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward]);
                        }
                    });
                });
            };
            t.prototype.checkEmpty = function () {
                if (
                    n.isEmptyObject(this.waypoints.horizontal) &&
                    n.isEmptyObject(this.waypoints.vertical)
                ) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id];
                }
            };
            return t;
        })();
        l = (function () {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function () {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height();
                        }
                        return t - n(this).outerHeight();
                    };
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i);
            }
            t.prototype.trigger = function (t) {
                if (!this.enabled) {
                    return;
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t);
                }
                if (this.options.triggerOnce) {
                    return this.destroy();
                }
            };
            t.prototype.disable = function () {
                return (this.enabled = false);
            };
            t.prototype.enable = function () {
                this.context.refresh();
                return (this.enabled = true);
            };
            t.prototype.destroy = function () {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty();
            };
            t.getWaypointsByElement = function (t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return [];
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function (t) {
                    return e[t];
                });
            };
            return t;
        })();
        d = {
            init: function (t, e) {
                var r;
                if (e == null) {
                    e = {};
                }
                if ((r = e.handler) == null) {
                    e.handler = t;
                }
                this.each(function () {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i);
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i);
                    }
                    return new l(t, r, e);
                });
                n[m]("refresh");
                return this;
            },
            disable: function () {
                return d._invoke(this, "disable");
            },
            enable: function () {
                return d._invoke(this, "enable");
            },
            destroy: function () {
                return d._invoke(this, "destroy");
            },
            prev: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1]);
                    }
                });
            },
            next: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1]);
                    }
                });
            },
            _traverse: function (t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical";
                }
                if (e == null) {
                    e = r;
                }
                l = h.aggregate(e);
                o = [];
                this.each(function () {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t]);
                });
                return this.pushStack(o);
            },
            _invoke: function (t, e) {
                t.each(function () {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function (t, n) {
                        n[e]();
                        return true;
                    });
                });
                return this;
            },
        };
        n.fn[g] = function () {
            var t, r;
            (r = arguments[0]),
                (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
            if (d[r]) {
                return d[r].apply(this, t);
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments);
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r]);
            } else if (!r) {
                return n.error(
                    "jQuery Waypoints needs a callback function or handler option."
                );
            } else {
                return n.error(
                    "The " + r + " method does not exist in jQuery Waypoints."
                );
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false,
        };
        h = {
            refresh: function () {
                return n.each(a, function (t, e) {
                    return e.refresh();
                });
            },
            viewportHeight: function () {
                var t;
                return (t = r.innerHeight) != null ? t : i.height();
            },
            aggregate: function (t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0;
                }
                if (!e) {
                    return [];
                }
                r = { horizontal: [], vertical: [] };
                n.each(r, function (t, i) {
                    n.each(e[t], function (t, e) {
                        return i.push(e);
                    });
                    i.sort(function (t, e) {
                        return t.offset - e.offset;
                    });
                    r[t] = n.map(i, function (t) {
                        return t.element;
                    });
                    return (r[t] = n.unique(r[t]));
                });
                return r;
            },
            above: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset <= t.oldScroll.y;
                });
            },
            below: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset > t.oldScroll.y;
                });
            },
            left: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset <= t.oldScroll.x;
                });
            },
            right: function (t) {
                if (t == null) {
                    t = r;
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset > t.oldScroll.x;
                });
            },
            enable: function () {
                return h._invoke("enable");
            },
            disable: function () {
                return h._invoke("disable");
            },
            destroy: function () {
                return h._invoke("destroy");
            },
            extendFn: function (t, e) {
                return (d[t] = e);
            },
            _invoke: function (t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function (e, n) {
                    n[t]();
                    return true;
                });
            },
            _filter: function (t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return [];
                }
                o = [];
                n.each(i.waypoints[e], function (t, e) {
                    if (r(i, e)) {
                        return o.push(e);
                    }
                });
                o.sort(function (t, e) {
                    return t.offset - e.offset;
                });
                return n.map(o, function (t) {
                    return t.element;
                });
            },
        };
        n[m] = function () {
            var t, n;
            (n = arguments[0]),
                (t = 2 <= arguments.length ? e.call(arguments, 1) : []);
            if (h[n]) {
                return h[n].apply(null, t);
            } else {
                return h.aggregate.call(null, n);
            }
        };
        n[m].settings = { resizeThrottle: 100, scrollThrottle: 30 };
        return i.load(function () {
            return n[m]("refresh");
        });
    });
}).call(this);

// Owl Carousel JS //
!(function (a, b, c, d) {
    function e(b, c) {
        (this.settings = null),
            (this.options = a.extend({}, e.Defaults, c)),
            (this.$element = a(b)),
            (this.drag = a.extend({}, m)),
            (this.state = a.extend({}, n)),
            (this.e = a.extend({}, o)),
            (this._plugins = {}),
            (this._supress = {}),
            (this._current = null),
            (this._speed = null),
            (this._coordinates = []),
            (this._breakpoint = null),
            (this._width = null),
            (this._items = []),
            (this._clones = []),
            (this._mergers = []),
            (this._invalidated = {}),
            (this._pipe = []),
            a.each(
                e.Plugins,
                a.proxy(function (a, b) {
                    this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(
                        this
                    );
                }, this)
            ),
            a.each(
                e.Pipe,
                a.proxy(function (b, c) {
                    this._pipe.push({
                        filter: c.filter,
                        run: a.proxy(c.run, this),
                    });
                }, this)
            ),
            this.setup(),
            this.initialize();
    }
    function f(a) {
        if (a.touches !== d)
            return { x: a.touches[0].pageX, y: a.touches[0].pageY };
        if (a.touches === d) {
            if (a.pageX !== d) return { x: a.pageX, y: a.pageY };
            if (a.pageX === d) return { x: a.clientX, y: a.clientY };
        }
    }
    function g(a) {
        var b,
            d,
            e = c.createElement("div"),
            f = a;
        for (b in f)
            if (((d = f[b]), "undefined" != typeof e.style[d]))
                return (e = null), [d, b];
        return [!1];
    }
    function h() {
        return g([
            "transition",
            "WebkitTransition",
            "MozTransition",
            "OTransition",
        ])[1];
    }
    function i() {
        return g([
            "transform",
            "WebkitTransform",
            "MozTransform",
            "OTransform",
            "msTransform",
        ])[0];
    }
    function j() {
        return g([
            "perspective",
            "webkitPerspective",
            "MozPerspective",
            "OPerspective",
            "MsPerspective",
        ])[0];
    }
    function k() {
        return "ontouchstart" in b || !!navigator.msMaxTouchPoints;
    }
    function l() {
        return b.navigator.msPointerEnabled;
    }
    var m, n, o;
    (m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null,
    }),
        (n = {
            isTouch: !1,
            isScrolling: !1,
            isSwiping: !1,
            direction: !1,
            inMotion: !1,
        }),
        (o = {
            _onDragStart: null,
            _onDragMove: null,
            _onDragEnd: null,
            _transitionEnd: null,
            _resizer: null,
            _responsiveCall: null,
            _goToLoop: null,
            _checkVisibile: null,
        }),
        (e.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: b,
            responsiveClass: !1,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            themeClass: "owl-theme",
            baseClass: "owl-carousel",
            itemClass: "owl-item",
            centerClass: "center",
            activeClass: "active",
        }),
        (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (e.Plugins = {}),
        (e.Pipe = [
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    a.current =
                        this._items &&
                        this._items[this.relative(this._current)];
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    var a = this._clones,
                        b = this.$stage.children(".cloned");
                    (b.length !== a.length ||
                        (!this.settings.loop && a.length > 0)) &&
                        (this.$stage.children(".cloned").remove(),
                        (this._clones = []));
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    var a,
                        b,
                        c = this._clones,
                        d = this._items,
                        e = this.settings.loop
                            ? c.length - Math.max(2 * this.settings.items, 4)
                            : 0;
                    for (a = 0, b = Math.abs(e / 2); b > a; a++)
                        e > 0
                            ? (this.$stage
                                  .children()
                                  .eq(d.length + c.length - 1)
                                  .remove(),
                              c.pop(),
                              this.$stage.children().eq(0).remove(),
                              c.pop())
                            : (c.push(c.length / 2),
                              this.$stage.append(
                                  d[c[c.length - 1]].clone().addClass("cloned")
                              ),
                              c.push(d.length - 1 - (c.length - 1) / 2),
                              this.$stage.prepend(
                                  d[c[c.length - 1]].clone().addClass("cloned")
                              ));
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    var a,
                        b,
                        c,
                        d = this.settings.rtl ? 1 : -1,
                        e = (this.width() / this.settings.items).toFixed(3),
                        f = 0;
                    for (
                        this._coordinates = [],
                            b = 0,
                            c = this._clones.length + this._items.length;
                        c > b;
                        b++
                    )
                        (a = this._mergers[this.relative(b)]),
                            (a =
                                (this.settings.mergeFit &&
                                    Math.min(a, this.settings.items)) ||
                                a),
                            (f +=
                                (this.settings.autoWidth
                                    ? this._items[this.relative(b)].width() +
                                      this.settings.margin
                                    : e * a) * d),
                            this._coordinates.push(f);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    var b,
                        c,
                        d = (this.width() / this.settings.items).toFixed(3),
                        e = {
                            width:
                                Math.abs(
                                    this._coordinates[
                                        this._coordinates.length - 1
                                    ]
                                ) +
                                2 * this.settings.stagePadding,
                            "padding-left": this.settings.stagePadding || "",
                            "padding-right": this.settings.stagePadding || "",
                        };
                    if (
                        (this.$stage.css(e),
                        (e = {
                            width: this.settings.autoWidth
                                ? "auto"
                                : d - this.settings.margin,
                        }),
                        (e[this.settings.rtl ? "margin-left" : "margin-right"] =
                            this.settings.margin),
                        !this.settings.autoWidth &&
                            a.grep(this._mergers, function (a) {
                                return a > 1;
                            }).length > 0)
                    )
                        for (b = 0, c = this._coordinates.length; c > b; b++)
                            (e.width =
                                Math.abs(this._coordinates[b]) -
                                Math.abs(this._coordinates[b - 1] || 0) -
                                this.settings.margin),
                                this.$stage.children().eq(b).css(e);
                    else this.$stage.children().css(e);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    a.current &&
                        this.reset(this.$stage.children().index(a.current));
                },
            },
            {
                filter: ["position"],
                run: function () {
                    this.animate(this.coordinates(this._current));
                },
            },
            {
                filter: ["width", "position", "items", "settings"],
                run: function () {
                    var a,
                        b,
                        c,
                        d,
                        e = this.settings.rtl ? 1 : -1,
                        f = 2 * this.settings.stagePadding,
                        g = this.coordinates(this.current()) + f,
                        h = g + this.width() * e,
                        i = [];
                    for (c = 0, d = this._coordinates.length; d > c; c++)
                        (a = this._coordinates[c - 1] || 0),
                            (b = Math.abs(this._coordinates[c]) + f * e),
                            ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                                i.push(c);
                    this.$stage
                        .children("." + this.settings.activeClass)
                        .removeClass(this.settings.activeClass),
                        this.$stage
                            .children(":eq(" + i.join("), :eq(") + ")")
                            .addClass(this.settings.activeClass),
                        this.settings.center &&
                            (this.$stage
                                .children("." + this.settings.centerClass)
                                .removeClass(this.settings.centerClass),
                            this.$stage
                                .children()
                                .eq(this.current())
                                .addClass(this.settings.centerClass));
                },
            },
        ]),
        (e.prototype.initialize = function () {
            if (
                (this.trigger("initialize"),
                this.$element
                    .addClass(this.settings.baseClass)
                    .addClass(this.settings.themeClass)
                    .toggleClass("owl-rtl", this.settings.rtl),
                this.browserSupport(),
                this.settings.autoWidth && this.state.imagesLoaded !== !0)
            ) {
                var b, c, e;
                if (
                    ((b = this.$element.find("img")),
                    (c = this.settings.nestedItemSelector
                        ? "." + this.settings.nestedItemSelector
                        : d),
                    (e = this.$element.children(c).width()),
                    b.length && 0 >= e)
                )
                    return this.preloadAutoWidthImages(b), !1;
            }
            this.$element.addClass("owl-loading"),
                (this.$stage = a(
                    "<" + this.settings.stageElement + ' class="owl-stage"/>'
                ).wrap('<div class="owl-stage-outer">')),
                this.$element.append(this.$stage.parent()),
                this.replace(
                    this.$element.children().not(this.$stage.parent())
                ),
                (this._width = this.$element.width()),
                this.refresh(),
                this.$element.removeClass("owl-loading").addClass("owl-loaded"),
                this.eventsCall(),
                this.internalEvents(),
                this.addTriggerableEvents(),
                this.trigger("initialized");
        }),
        (e.prototype.setup = function () {
            var b = this.viewport(),
                c = this.options.responsive,
                d = -1,
                e = null;
            c
                ? (a.each(c, function (a) {
                      b >= a && a > d && (d = Number(a));
                  }),
                  (e = a.extend({}, this.options, c[d])),
                  delete e.responsive,
                  e.responsiveClass &&
                      this.$element
                          .attr("class", function (a, b) {
                              return b.replace(/\b owl-responsive-\S+/g, "");
                          })
                          .addClass("owl-responsive-" + d))
                : (e = a.extend({}, this.options)),
                (null === this.settings || this._breakpoint !== d) &&
                    (this.trigger("change", {
                        property: { name: "settings", value: e },
                    }),
                    (this._breakpoint = d),
                    (this.settings = e),
                    this.invalidate("settings"),
                    this.trigger("changed", {
                        property: { name: "settings", value: this.settings },
                    }));
        }),
        (e.prototype.optionsLogic = function () {
            this.$element.toggleClass("owl-center", this.settings.center),
                this.settings.loop &&
                    this._items.length < this.settings.items &&
                    (this.settings.loop = !1),
                this.settings.autoWidth &&
                    ((this.settings.stagePadding = !1),
                    (this.settings.merge = !1));
        }),
        (e.prototype.prepare = function (b) {
            var c = this.trigger("prepare", { content: b });
            return (
                c.data ||
                    (c.data = a("<" + this.settings.itemElement + "/>")
                        .addClass(this.settings.itemClass)
                        .append(b)),
                this.trigger("prepared", { content: c.data }),
                c.data
            );
        }),
        (e.prototype.update = function () {
            for (
                var b = 0,
                    c = this._pipe.length,
                    d = a.proxy(function (a) {
                        return this[a];
                    }, this._invalidated),
                    e = {};
                c > b;

            )
                (this._invalidated.all ||
                    a.grep(this._pipe[b].filter, d).length > 0) &&
                    this._pipe[b].run(e),
                    b++;
            this._invalidated = {};
        }),
        (e.prototype.width = function (a) {
            switch ((a = a || e.Width.Default)) {
                case e.Width.Inner:
                case e.Width.Outer:
                    return this._width;
                default:
                    return (
                        this._width -
                        2 * this.settings.stagePadding +
                        this.settings.margin
                    );
            }
        }),
        (e.prototype.refresh = function () {
            if (0 === this._items.length) return !1;
            new Date().getTime();
            this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$stage.addClass("owl-refresh"),
                this.update(),
                this.$stage.removeClass("owl-refresh"),
                (this.state.orientation = b.orientation),
                this.watchVisibility(),
                this.trigger("refreshed");
        }),
        (e.prototype.eventsCall = function () {
            (this.e._onDragStart = a.proxy(function (a) {
                this.onDragStart(a);
            }, this)),
                (this.e._onDragMove = a.proxy(function (a) {
                    this.onDragMove(a);
                }, this)),
                (this.e._onDragEnd = a.proxy(function (a) {
                    this.onDragEnd(a);
                }, this)),
                (this.e._onResize = a.proxy(function (a) {
                    this.onResize(a);
                }, this)),
                (this.e._transitionEnd = a.proxy(function (a) {
                    this.transitionEnd(a);
                }, this)),
                (this.e._preventClick = a.proxy(function (a) {
                    this.preventClick(a);
                }, this));
        }),
        (e.prototype.onThrottledResize = function () {
            b.clearTimeout(this.resizeTimer),
                (this.resizeTimer = b.setTimeout(
                    this.e._onResize,
                    this.settings.responsiveRefreshRate
                ));
        }),
        (e.prototype.onResize = function () {
            return this._items.length
                ? this._width === this.$element.width()
                    ? !1
                    : this.trigger("resize").isDefaultPrevented()
                    ? !1
                    : ((this._width = this.$element.width()),
                      this.invalidate("width"),
                      this.refresh(),
                      void this.trigger("resized"))
                : !1;
        }),
        (e.prototype.eventsRouter = function (a) {
            var b = a.type;
            "mousedown" === b || "touchstart" === b
                ? this.onDragStart(a)
                : "mousemove" === b || "touchmove" === b
                ? this.onDragMove(a)
                : "mouseup" === b || "touchend" === b
                ? this.onDragEnd(a)
                : "touchcancel" === b && this.onDragEnd(a);
        }),
        (e.prototype.internalEvents = function () {
            var c = (k(), l());
            this.settings.mouseDrag
                ? (this.$stage.on(
                      "mousedown",
                      a.proxy(function (a) {
                          this.eventsRouter(a);
                      }, this)
                  ),
                  this.$stage.on("dragstart", function () {
                      return !1;
                  }),
                  (this.$stage.get(0).onselectstart = function () {
                      return !1;
                  }))
                : this.$element.addClass("owl-text-select-on"),
                this.settings.touchDrag &&
                    !c &&
                    this.$stage.on(
                        "touchstart touchcancel",
                        a.proxy(function (a) {
                            this.eventsRouter(a);
                        }, this)
                    ),
                this.transitionEndVendor &&
                    this.on(
                        this.$stage.get(0),
                        this.transitionEndVendor,
                        this.e._transitionEnd,
                        !1
                    ),
                this.settings.responsive !== !1 &&
                    this.on(b, "resize", a.proxy(this.onThrottledResize, this));
        }),
        (e.prototype.onDragStart = function (d) {
            var e, g, h, i;
            if (
                ((e = d.originalEvent || d || b.event),
                3 === e.which || this.state.isTouch)
            )
                return !1;
            if (
                ("mousedown" === e.type && this.$stage.addClass("owl-grab"),
                this.trigger("drag"),
                (this.drag.startTime = new Date().getTime()),
                this.speed(0),
                (this.state.isTouch = !0),
                (this.state.isScrolling = !1),
                (this.state.isSwiping = !1),
                (this.drag.distance = 0),
                (g = f(e).x),
                (h = f(e).y),
                (this.drag.offsetX = this.$stage.position().left),
                (this.drag.offsetY = this.$stage.position().top),
                this.settings.rtl &&
                    (this.drag.offsetX =
                        this.$stage.position().left +
                        this.$stage.width() -
                        this.width() +
                        this.settings.margin),
                this.state.inMotion && this.support3d)
            )
                (i = this.getTransformProperty()),
                    (this.drag.offsetX = i),
                    this.animate(i),
                    (this.state.inMotion = !0);
            else if (this.state.inMotion && !this.support3d)
                return (this.state.inMotion = !1), !1;
            (this.drag.startX = g - this.drag.offsetX),
                (this.drag.startY = h - this.drag.offsetY),
                (this.drag.start = g - this.drag.startX),
                (this.drag.targetEl = e.target || e.srcElement),
                (this.drag.updatedX = this.drag.start),
                ("IMG" === this.drag.targetEl.tagName ||
                    "A" === this.drag.targetEl.tagName) &&
                    (this.drag.targetEl.draggable = !1),
                a(c).on(
                    "mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",
                    a.proxy(function (a) {
                        this.eventsRouter(a);
                    }, this)
                );
        }),
        (e.prototype.onDragMove = function (a) {
            var c, e, g, h, i, j;
            this.state.isTouch &&
                (this.state.isScrolling ||
                    ((c = a.originalEvent || a || b.event),
                    (e = f(c).x),
                    (g = f(c).y),
                    (this.drag.currentX = e - this.drag.startX),
                    (this.drag.currentY = g - this.drag.startY),
                    (this.drag.distance =
                        this.drag.currentX - this.drag.offsetX),
                    this.drag.distance < 0
                        ? (this.state.direction = this.settings.rtl
                              ? "right"
                              : "left")
                        : this.drag.distance > 0 &&
                          (this.state.direction = this.settings.rtl
                              ? "left"
                              : "right"),
                    this.settings.loop
                        ? this.op(
                              this.drag.currentX,
                              ">",
                              this.coordinates(this.minimum())
                          ) && "right" === this.state.direction
                            ? (this.drag.currentX -=
                                  (this.settings.center &&
                                      this.coordinates(0)) -
                                  this.coordinates(this._items.length))
                            : this.op(
                                  this.drag.currentX,
                                  "<",
                                  this.coordinates(this.maximum())
                              ) &&
                              "left" === this.state.direction &&
                              (this.drag.currentX +=
                                  (this.settings.center &&
                                      this.coordinates(0)) -
                                  this.coordinates(this._items.length))
                        : ((h = this.coordinates(
                              this.settings.rtl
                                  ? this.maximum()
                                  : this.minimum()
                          )),
                          (i = this.coordinates(
                              this.settings.rtl
                                  ? this.minimum()
                                  : this.maximum()
                          )),
                          (j = this.settings.pullDrag
                              ? this.drag.distance / 5
                              : 0),
                          (this.drag.currentX = Math.max(
                              Math.min(this.drag.currentX, h + j),
                              i + j
                          ))),
                    (this.drag.distance > 8 || this.drag.distance < -8) &&
                        (c.preventDefault !== d
                            ? c.preventDefault()
                            : (c.returnValue = !1),
                        (this.state.isSwiping = !0)),
                    (this.drag.updatedX = this.drag.currentX),
                    (this.drag.currentY > 16 || this.drag.currentY < -16) &&
                        this.state.isSwiping === !1 &&
                        ((this.state.isScrolling = !0),
                        (this.drag.updatedX = this.drag.start)),
                    this.animate(this.drag.updatedX)));
        }),
        (e.prototype.onDragEnd = function (b) {
            var d, e, f;
            if (this.state.isTouch) {
                if (
                    ("mouseup" === b.type &&
                        this.$stage.removeClass("owl-grab"),
                    this.trigger("dragged"),
                    this.drag.targetEl.removeAttribute("draggable"),
                    (this.state.isTouch = !1),
                    (this.state.isScrolling = !1),
                    (this.state.isSwiping = !1),
                    0 === this.drag.distance && this.state.inMotion !== !0)
                )
                    return (this.state.inMotion = !1), !1;
                (this.drag.endTime = new Date().getTime()),
                    (d = this.drag.endTime - this.drag.startTime),
                    (e = Math.abs(this.drag.distance)),
                    (e > 3 || d > 300) && this.removeClick(this.drag.targetEl),
                    (f = this.closest(this.drag.updatedX)),
                    this.speed(
                        this.settings.dragEndSpeed || this.settings.smartSpeed
                    ),
                    this.current(f),
                    this.invalidate("position"),
                    this.update(),
                    this.settings.pullDrag ||
                        this.drag.updatedX !== this.coordinates(f) ||
                        this.transitionEnd(),
                    (this.drag.distance = 0),
                    a(c).off(".owl.dragEvents");
            }
        }),
        (e.prototype.removeClick = function (c) {
            (this.drag.targetEl = c),
                a(c).on("click.preventClick", this.e._preventClick),
                b.setTimeout(function () {
                    a(c).off("click.preventClick");
                }, 300);
        }),
        (e.prototype.preventClick = function (b) {
            b.preventDefault ? b.preventDefault() : (b.returnValue = !1),
                b.stopPropagation && b.stopPropagation(),
                a(b.target).off("click.preventClick");
        }),
        (e.prototype.getTransformProperty = function () {
            var a, c;
            return (
                (a = b
                    .getComputedStyle(this.$stage.get(0), null)
                    .getPropertyValue(this.vendorName + "transform")),
                (a = a.replace(/matrix(3d)?\(|\)/g, "").split(",")),
                (c = 16 === a.length),
                c !== !0 ? a[4] : a[12]
            );
        }),
        (e.prototype.closest = function (b) {
            var c = -1,
                d = 30,
                e = this.width(),
                f = this.coordinates();
            return (
                this.settings.freeDrag ||
                    a.each(
                        f,
                        a.proxy(function (a, g) {
                            return (
                                b > g - d && g + d > b
                                    ? (c = a)
                                    : this.op(b, "<", g) &&
                                      this.op(b, ">", f[a + 1] || g - e) &&
                                      (c =
                                          "left" === this.state.direction
                                              ? a + 1
                                              : a),
                                -1 === c
                            );
                        }, this)
                    ),
                this.settings.loop ||
                    (this.op(b, ">", f[this.minimum()])
                        ? (c = b = this.minimum())
                        : this.op(b, "<", f[this.maximum()]) &&
                          (c = b = this.maximum())),
                c
            );
        }),
        (e.prototype.animate = function (b) {
            this.trigger("translate"),
                (this.state.inMotion = this.speed() > 0),
                this.support3d
                    ? this.$stage.css({
                          transform: "translate3d(" + b + "px,0px, 0px)",
                          transition: this.speed() / 1e3 + "s",
                      })
                    : this.state.isTouch
                    ? this.$stage.css({ left: b + "px" })
                    : this.$stage.animate(
                          { left: b },
                          this.speed() / 1e3,
                          this.settings.fallbackEasing,
                          a.proxy(function () {
                              this.state.inMotion && this.transitionEnd();
                          }, this)
                      );
        }),
        (e.prototype.current = function (a) {
            if (a === d) return this._current;
            if (0 === this._items.length) return d;
            if (((a = this.normalize(a)), this._current !== a)) {
                var b = this.trigger("change", {
                    property: { name: "position", value: a },
                });
                b.data !== d && (a = this.normalize(b.data)),
                    (this._current = a),
                    this.invalidate("position"),
                    this.trigger("changed", {
                        property: { name: "position", value: this._current },
                    });
            }
            return this._current;
        }),
        (e.prototype.invalidate = function (a) {
            this._invalidated[a] = !0;
        }),
        (e.prototype.reset = function (a) {
            (a = this.normalize(a)),
                a !== d &&
                    ((this._speed = 0),
                    (this._current = a),
                    this.suppress(["translate", "translated"]),
                    this.animate(this.coordinates(a)),
                    this.release(["translate", "translated"]));
        }),
        (e.prototype.normalize = function (b, c) {
            var e = c
                ? this._items.length
                : this._items.length + this._clones.length;
            return !a.isNumeric(b) || 1 > e
                ? d
                : (b = this._clones.length
                      ? ((b % e) + e) % e
                      : Math.max(
                            this.minimum(c),
                            Math.min(this.maximum(c), b)
                        ));
        }),
        (e.prototype.relative = function (a) {
            return (
                (a = this.normalize(a)),
                (a -= this._clones.length / 2),
                this.normalize(a, !0)
            );
        }),
        (e.prototype.maximum = function (a) {
            var b,
                c,
                d,
                e = 0,
                f = this.settings;
            if (a) return this._items.length - 1;
            if (!f.loop && f.center) b = this._items.length - 1;
            else if (f.loop || f.center)
                if (f.loop || f.center) b = this._items.length + f.items;
                else {
                    if (!f.autoWidth && !f.merge)
                        throw "Can not detect maximum absolute position.";
                    for (
                        revert = f.rtl ? 1 : -1,
                            c = this.$stage.width() - this.$element.width();
                        (d = this.coordinates(e)) && !(d * revert >= c);

                    )
                        b = ++e;
                }
            else b = this._items.length - f.items;
            return b;
        }),
        (e.prototype.minimum = function (a) {
            return a ? 0 : this._clones.length / 2;
        }),
        (e.prototype.items = function (a) {
            return a === d
                ? this._items.slice()
                : ((a = this.normalize(a, !0)), this._items[a]);
        }),
        (e.prototype.mergers = function (a) {
            return a === d
                ? this._mergers.slice()
                : ((a = this.normalize(a, !0)), this._mergers[a]);
        }),
        (e.prototype.clones = function (b) {
            var c = this._clones.length / 2,
                e = c + this._items.length,
                f = function (a) {
                    return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2;
                };
            return b === d
                ? a.map(this._clones, function (a, b) {
                      return f(b);
                  })
                : a.map(this._clones, function (a, c) {
                      return a === b ? f(c) : null;
                  });
        }),
        (e.prototype.speed = function (a) {
            return a !== d && (this._speed = a), this._speed;
        }),
        (e.prototype.coordinates = function (b) {
            var c = null;
            return b === d
                ? a.map(
                      this._coordinates,
                      a.proxy(function (a, b) {
                          return this.coordinates(b);
                      }, this)
                  )
                : (this.settings.center
                      ? ((c = this._coordinates[b]),
                        (c +=
                            ((this.width() -
                                c +
                                (this._coordinates[b - 1] || 0)) /
                                2) *
                            (this.settings.rtl ? -1 : 1)))
                      : (c = this._coordinates[b - 1] || 0),
                  c);
        }),
        (e.prototype.duration = function (a, b, c) {
            return (
                Math.min(Math.max(Math.abs(b - a), 1), 6) *
                Math.abs(c || this.settings.smartSpeed)
            );
        }),
        (e.prototype.to = function (c, d) {
            if (this.settings.loop) {
                var e = c - this.relative(this.current()),
                    f = this.current(),
                    g = this.current(),
                    h = this.current() + e,
                    i = 0 > g - h ? !0 : !1,
                    j = this._clones.length + this._items.length;
                h < this.settings.items && i === !1
                    ? ((f = g + this._items.length), this.reset(f))
                    : h >= j - this.settings.items &&
                      i === !0 &&
                      ((f = g - this._items.length), this.reset(f)),
                    b.clearTimeout(this.e._goToLoop),
                    (this.e._goToLoop = b.setTimeout(
                        a.proxy(function () {
                            this.speed(this.duration(this.current(), f + e, d)),
                                this.current(f + e),
                                this.update();
                        }, this),
                        30
                    ));
            } else
                this.speed(this.duration(this.current(), c, d)),
                    this.current(c),
                    this.update();
        }),
        (e.prototype.next = function (a) {
            (a = a || !1), this.to(this.relative(this.current()) + 1, a);
        }),
        (e.prototype.prev = function (a) {
            (a = a || !1), this.to(this.relative(this.current()) - 1, a);
        }),
        (e.prototype.transitionEnd = function (a) {
            return a !== d &&
                (a.stopPropagation(),
                (a.target || a.srcElement || a.originalTarget) !==
                    this.$stage.get(0))
                ? !1
                : ((this.state.inMotion = !1), void this.trigger("translated"));
        }),
        (e.prototype.viewport = function () {
            var d;
            if (this.options.responsiveBaseElement !== b)
                d = a(this.options.responsiveBaseElement).width();
            else if (b.innerWidth) d = b.innerWidth;
            else {
                if (!c.documentElement || !c.documentElement.clientWidth)
                    throw "Can not detect viewport width.";
                d = c.documentElement.clientWidth;
            }
            return d;
        }),
        (e.prototype.replace = function (b) {
            this.$stage.empty(),
                (this._items = []),
                b && (b = b instanceof jQuery ? b : a(b)),
                this.settings.nestedItemSelector &&
                    (b = b.find("." + this.settings.nestedItemSelector)),
                b
                    .filter(function () {
                        return 1 === this.nodeType;
                    })
                    .each(
                        a.proxy(function (a, b) {
                            (b = this.prepare(b)),
                                this.$stage.append(b),
                                this._items.push(b),
                                this._mergers.push(
                                    1 *
                                        b
                                            .find("[data-merge]")
                                            .andSelf("[data-merge]")
                                            .attr("data-merge") || 1
                                );
                        }, this)
                    ),
                this.reset(
                    a.isNumeric(this.settings.startPosition)
                        ? this.settings.startPosition
                        : 0
                ),
                this.invalidate("items");
        }),
        (e.prototype.add = function (a, b) {
            (b = b === d ? this._items.length : this.normalize(b, !0)),
                this.trigger("add", { content: a, position: b }),
                0 === this._items.length || b === this._items.length
                    ? (this.$stage.append(a),
                      this._items.push(a),
                      this._mergers.push(
                          1 *
                              a
                                  .find("[data-merge]")
                                  .andSelf("[data-merge]")
                                  .attr("data-merge") || 1
                      ))
                    : (this._items[b].before(a),
                      this._items.splice(b, 0, a),
                      this._mergers.splice(
                          b,
                          0,
                          1 *
                              a
                                  .find("[data-merge]")
                                  .andSelf("[data-merge]")
                                  .attr("data-merge") || 1
                      )),
                this.invalidate("items"),
                this.trigger("added", { content: a, position: b });
        }),
        (e.prototype.remove = function (a) {
            (a = this.normalize(a, !0)),
                a !== d &&
                    (this.trigger("remove", {
                        content: this._items[a],
                        position: a,
                    }),
                    this._items[a].remove(),
                    this._items.splice(a, 1),
                    this._mergers.splice(a, 1),
                    this.invalidate("items"),
                    this.trigger("removed", { content: null, position: a }));
        }),
        (e.prototype.addTriggerableEvents = function () {
            var b = a.proxy(function (b, c) {
                return a.proxy(function (a) {
                    a.relatedTarget !== this &&
                        (this.suppress([c]),
                        b.apply(this, [].slice.call(arguments, 1)),
                        this.release([c]));
                }, this);
            }, this);
            a.each(
                {
                    next: this.next,
                    prev: this.prev,
                    to: this.to,
                    destroy: this.destroy,
                    refresh: this.refresh,
                    replace: this.replace,
                    add: this.add,
                    remove: this.remove,
                },
                a.proxy(function (a, c) {
                    this.$element.on(
                        a + ".owl.carousel",
                        b(c, a + ".owl.carousel")
                    );
                }, this)
            );
        }),
        (e.prototype.watchVisibility = function () {
            function c(a) {
                return a.offsetWidth > 0 && a.offsetHeight > 0;
            }
            function d() {
                c(this.$element.get(0)) &&
                    (this.$element.removeClass("owl-hidden"),
                    this.refresh(),
                    b.clearInterval(this.e._checkVisibile));
            }
            c(this.$element.get(0)) ||
                (this.$element.addClass("owl-hidden"),
                b.clearInterval(this.e._checkVisibile),
                (this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500)));
        }),
        (e.prototype.preloadAutoWidthImages = function (b) {
            var c, d, e, f;
            (c = 0),
                (d = this),
                b.each(function (g, h) {
                    (e = a(h)),
                        (f = new Image()),
                        (f.onload = function () {
                            c++,
                                e.attr("src", f.src),
                                e.css("opacity", 1),
                                c >= b.length &&
                                    ((d.state.imagesLoaded = !0),
                                    d.initialize());
                        }),
                        (f.src =
                            e.attr("src") ||
                            e.attr("data-src") ||
                            e.attr("data-src-retina"));
                });
        }),
        (e.prototype.destroy = function () {
            this.$element.hasClass(this.settings.themeClass) &&
                this.$element.removeClass(this.settings.themeClass),
                this.settings.responsive !== !1 &&
                    a(b).off("resize.owl.carousel"),
                this.transitionEndVendor &&
                    this.off(
                        this.$stage.get(0),
                        this.transitionEndVendor,
                        this.e._transitionEnd
                    );
            for (var d in this._plugins) this._plugins[d].destroy();
            (this.settings.mouseDrag || this.settings.touchDrag) &&
                (this.$stage.off("mousedown touchstart touchcancel"),
                a(c).off(".owl.dragEvents"),
                (this.$stage.get(0).onselectstart = function () {}),
                this.$stage.off("dragstart", function () {
                    return !1;
                })),
                this.$element.off(".owl"),
                this.$stage.children(".cloned").remove(),
                (this.e = null),
                this.$element.removeData("owlCarousel"),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.unwrap();
        }),
        (e.prototype.op = function (a, b, c) {
            var d = this.settings.rtl;
            switch (b) {
                case "<":
                    return d ? a > c : c > a;
                case ">":
                    return d ? c > a : a > c;
                case ">=":
                    return d ? c >= a : a >= c;
                case "<=":
                    return d ? a >= c : c >= a;
            }
        }),
        (e.prototype.on = function (a, b, c, d) {
            a.addEventListener
                ? a.addEventListener(b, c, d)
                : a.attachEvent && a.attachEvent("on" + b, c);
        }),
        (e.prototype.off = function (a, b, c, d) {
            a.removeEventListener
                ? a.removeEventListener(b, c, d)
                : a.detachEvent && a.detachEvent("on" + b, c);
        }),
        (e.prototype.trigger = function (b, c, d) {
            var e = {
                    item: { count: this._items.length, index: this.current() },
                },
                f = a.camelCase(
                    a
                        .grep(["on", b, d], function (a) {
                            return a;
                        })
                        .join("-")
                        .toLowerCase()
                ),
                g = a.Event(
                    [b, "owl", d || "carousel"].join(".").toLowerCase(),
                    a.extend({ relatedTarget: this }, e, c)
                );
            return (
                this._supress[b] ||
                    (a.each(this._plugins, function (a, b) {
                        b.onTrigger && b.onTrigger(g);
                    }),
                    this.$element.trigger(g),
                    this.settings &&
                        "function" == typeof this.settings[f] &&
                        this.settings[f].apply(this, g)),
                g
            );
        }),
        (e.prototype.suppress = function (b) {
            a.each(
                b,
                a.proxy(function (a, b) {
                    this._supress[b] = !0;
                }, this)
            );
        }),
        (e.prototype.release = function (b) {
            a.each(
                b,
                a.proxy(function (a, b) {
                    delete this._supress[b];
                }, this)
            );
        }),
        (e.prototype.browserSupport = function () {
            if (((this.support3d = j()), this.support3d)) {
                this.transformVendor = i();
                var a = [
                    "transitionend",
                    "webkitTransitionEnd",
                    "transitionend",
                    "oTransitionEnd",
                ];
                (this.transitionEndVendor = a[h()]),
                    (this.vendorName = this.transformVendor.replace(
                        /Transform/i,
                        ""
                    )),
                    (this.vendorName =
                        "" !== this.vendorName
                            ? "-" + this.vendorName.toLowerCase() + "-"
                            : "");
            }
            this.state.orientation = b.orientation;
        }),
        (a.fn.owlCarousel = function (b) {
            return this.each(function () {
                a(this).data("owlCarousel") ||
                    a(this).data("owlCarousel", new e(this, b));
            });
        }),
        (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
    (function (a, b) {
        var c = function (b) {
            (this._core = b),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel": a.proxy(
                        function (b) {
                            if (
                                b.namespace &&
                                this._core.settings &&
                                this._core.settings.lazyLoad &&
                                ((b.property &&
                                    "position" == b.property.name) ||
                                    "initialized" == b.type)
                            )
                                for (
                                    var c = this._core.settings,
                                        d =
                                            (c.center &&
                                                Math.ceil(c.items / 2)) ||
                                            c.items,
                                        e = (c.center && -1 * d) || 0,
                                        f =
                                            ((b.property && b.property.value) ||
                                                this._core.current()) + e,
                                        g = this._core.clones().length,
                                        h = a.proxy(function (a, b) {
                                            this.load(b);
                                        }, this);
                                    e++ < d;

                                )
                                    this.load(g / 2 + this._core.relative(f)),
                                        g &&
                                            a.each(
                                                this._core.clones(
                                                    this._core.relative(f++)
                                                ),
                                                h
                                            );
                        },
                        this
                    ),
                }),
                (this._core.options = a.extend(
                    {},
                    c.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (c.Defaults = { lazyLoad: !1 }),
            (c.prototype.load = function (c) {
                var d = this._core.$stage.children().eq(c),
                    e = d && d.find(".owl-lazy");
                !e ||
                    a.inArray(d.get(0), this._loaded) > -1 ||
                    (e.each(
                        a.proxy(function (c, d) {
                            var e,
                                f = a(d),
                                g =
                                    (b.devicePixelRatio > 1 &&
                                        f.attr("data-src-retina")) ||
                                    f.attr("data-src");
                            this._core.trigger(
                                "load",
                                { element: f, url: g },
                                "lazy"
                            ),
                                f.is("img")
                                    ? f
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  f.css("opacity", 1),
                                                      this._core.trigger(
                                                          "loaded",
                                                          {
                                                              element: f,
                                                              url: g,
                                                          },
                                                          "lazy"
                                                      );
                                              }, this)
                                          )
                                          .attr("src", g)
                                    : ((e = new Image()),
                                      (e.onload = a.proxy(function () {
                                          f.css({
                                              "background-image":
                                                  "url(" + g + ")",
                                              opacity: "1",
                                          }),
                                              this._core.trigger(
                                                  "loaded",
                                                  { element: f, url: g },
                                                  "lazy"
                                              );
                                      }, this)),
                                      (e.src = g));
                        }, this)
                    ),
                    this._loaded.push(d.get(0)));
            }),
            (c.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this._core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Lazy = c);
    })(window.Zepto || window.jQuery, window, document),
    (function (a) {
        var b = function (c) {
            (this._core = c),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function () {
                        this._core.settings.autoHeight && this.update();
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        this._core.settings.autoHeight &&
                            "position" == a.property.name &&
                            this.update();
                    }, this),
                    "loaded.owl.lazy": a.proxy(function (a) {
                        this._core.settings.autoHeight &&
                            a.element.closest(
                                "." + this._core.settings.itemClass
                            ) ===
                                this._core.$stage
                                    .children()
                                    .eq(this._core.current()) &&
                            this.update();
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    b.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (b.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (b.prototype.update = function () {
                this._core.$stage
                    .parent()
                    .height(
                        this._core.$stage
                            .children()
                            .eq(this._core.current())
                            .height()
                    )
                    .addClass(this._core.settings.autoHeightClass);
            }),
            (b.prototype.destroy = function () {
                var a, b;
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c) {
        var d = function (b) {
            (this._core = b),
                (this._videos = {}),
                (this._playing = null),
                (this._fullscreen = !1),
                (this._handlers = {
                    "resize.owl.carousel": a.proxy(function (a) {
                        this._core.settings.video &&
                            !this.isInFullScreen() &&
                            a.preventDefault();
                    }, this),
                    "refresh.owl.carousel changed.owl.carousel": a.proxy(
                        function () {
                            this._playing && this.stop();
                        },
                        this
                    ),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        var c = a(b.content).find(".owl-video");
                        c.length &&
                            (c.css("display", "none"),
                            this.fetch(c, a(b.content)));
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    d.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    a.proxy(function (a) {
                        this.play(a);
                    }, this)
                );
        };
        (d.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (d.prototype.fetch = function (a, b) {
                var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
                    d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
                    e = a.attr("data-width") || this._core.settings.videoWidth,
                    f =
                        a.attr("data-height") ||
                        this._core.settings.videoHeight,
                    g = a.attr("href");
                if (!g) throw new Error("Missing video URL.");
                if (
                    ((d = g.match(
                        /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    )),
                    d[3].indexOf("youtu") > -1)
                )
                    c = "youtube";
                else {
                    if (!(d[3].indexOf("vimeo") > -1))
                        throw new Error("Video URL not supported.");
                    c = "vimeo";
                }
                (d = d[6]),
                    (this._videos[g] = { type: c, id: d, width: e, height: f }),
                    b.attr("data-video", g),
                    this.thumbnail(a, this._videos[g]);
            }),
            (d.prototype.thumbnail = function (b, c) {
                var d,
                    e,
                    f,
                    g =
                        c.width && c.height
                            ? 'style="width:' +
                              c.width +
                              "px;height:" +
                              c.height +
                              'px;"'
                            : "",
                    h = b.find("img"),
                    i = "src",
                    j = "",
                    k = this._core.settings,
                    l = function (a) {
                        (e = '<div class="owl-video-play-icon"></div>'),
                            (d = k.lazyLoad
                                ? '<div class="owl-video-tn ' +
                                  j +
                                  '" ' +
                                  i +
                                  '="' +
                                  a +
                                  '"></div>'
                                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                                  a +
                                  ')"></div>'),
                            b.after(d),
                            b.after(e);
                    };
                return (
                    b.wrap('<div class="owl-video-wrapper"' + g + "></div>"),
                    this._core.settings.lazyLoad &&
                        ((i = "data-src"), (j = "owl-lazy")),
                    h.length
                        ? (l(h.attr(i)), h.remove(), !1)
                        : void ("youtube" === c.type
                              ? ((f =
                                    "http://img.youtube.com/vi/" +
                                    c.id +
                                    "/hqdefault.jpg"),
                                l(f))
                              : "vimeo" === c.type &&
                                a.ajax({
                                    type: "GET",
                                    url:
                                        "http://vimeo.com/api/v2/video/" +
                                        c.id +
                                        ".json",
                                    jsonp: "callback",
                                    dataType: "jsonp",
                                    success: function (a) {
                                        (f = a[0].thumbnail_large), l(f);
                                    },
                                }))
                );
            }),
            (d.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null);
            }),
            (d.prototype.play = function (b) {
                this._core.trigger("play", null, "video"),
                    this._playing && this.stop();
                var c,
                    d,
                    e = a(b.target || b.srcElement),
                    f = e.closest("." + this._core.settings.itemClass),
                    g = this._videos[f.attr("data-video")],
                    h = g.width || "100%",
                    i = g.height || this._core.$stage.height();
                "youtube" === g.type
                    ? (c =
                          '<iframe width="' +
                          h +
                          '" height="' +
                          i +
                          '" src="http://www.youtube.com/embed/' +
                          g.id +
                          "?autoplay=1&v=" +
                          g.id +
                          '" frameborder="0" allowfullscreen></iframe>')
                    : "vimeo" === g.type &&
                      (c =
                          '<iframe src="http://player.vimeo.com/video/' +
                          g.id +
                          '?autoplay=1" width="' +
                          h +
                          '" height="' +
                          i +
                          '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
                    f.addClass("owl-video-playing"),
                    (this._playing = f),
                    (d = a(
                        '<div style="height:' +
                            i +
                            "px; width:" +
                            h +
                            'px" class="owl-video-frame">' +
                            c +
                            "</div>"
                    )),
                    e.after(d);
            }),
            (d.prototype.isInFullScreen = function () {
                var d =
                    c.fullscreenElement ||
                    c.mozFullScreenElement ||
                    c.webkitFullscreenElement;
                return (
                    d &&
                        a(d).parent().hasClass("owl-video-frame") &&
                        (this._core.speed(0), (this._fullscreen = !0)),
                    d && this._fullscreen && this._playing
                        ? !1
                        : this._fullscreen
                        ? ((this._fullscreen = !1), !1)
                        : this._playing &&
                          this._core.state.orientation !== b.orientation
                        ? ((this._core.state.orientation = b.orientation), !1)
                        : !0
                );
            }),
            (d.prototype.destroy = function () {
                var a, b;
                this._core.$element.off("click.owl.video");
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Video = d);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this.core = b),
                (this.core.options = a.extend(
                    {},
                    e.Defaults,
                    this.core.options
                )),
                (this.swapping = !0),
                (this.previous = d),
                (this.next = d),
                (this.handlers = {
                    "change.owl.carousel": a.proxy(function (a) {
                        "position" == a.property.name &&
                            ((this.previous = this.core.current()),
                            (this.next = a.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
                        a.proxy(function (a) {
                            this.swapping = "translated" == a.type;
                        }, this),
                    "translate.owl.carousel": a.proxy(function () {
                        this.swapping &&
                            (this.core.options.animateOut ||
                                this.core.options.animateIn) &&
                            this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (e.Defaults = { animateOut: !1, animateIn: !1 }),
            (e.prototype.swap = function () {
                if (1 === this.core.settings.items && this.core.support3d) {
                    this.core.speed(0);
                    var b,
                        c = a.proxy(this.clear, this),
                        d = this.core.$stage.children().eq(this.previous),
                        e = this.core.$stage.children().eq(this.next),
                        f = this.core.settings.animateIn,
                        g = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (g &&
                            ((b =
                                this.core.coordinates(this.previous) -
                                this.core.coordinates(this.next)),
                            d
                                .css({ left: b + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(g)
                                .one(
                                    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                                    c
                                )),
                        f &&
                            e
                                .addClass("animated owl-animated-in")
                                .addClass(f)
                                .one(
                                    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                                    c
                                ));
                }
            }),
            (e.prototype.clear = function (b) {
                a(b.target)
                    .css({ left: "" })
                    .removeClass("animated owl-animated-out owl-animated-in")
                    .removeClass(this.core.settings.animateIn)
                    .removeClass(this.core.settings.animateOut),
                    this.core.transitionEnd();
            }),
            (e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this.core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c) {
        var d = function (b) {
            (this.core = b),
                (this.core.options = a.extend(
                    {},
                    d.Defaults,
                    this.core.options
                )),
                (this.handlers = {
                    "translated.owl.carousel refreshed.owl.carousel": a.proxy(
                        function () {
                            this.autoplay();
                        },
                        this
                    ),
                    "play.owl.autoplay": a.proxy(function (a, b, c) {
                        this.play(b, c);
                    }, this),
                    "stop.owl.autoplay": a.proxy(function () {
                        this.stop();
                    }, this),
                    "mouseover.owl.autoplay": a.proxy(function () {
                        this.core.settings.autoplayHoverPause && this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": a.proxy(function () {
                        this.core.settings.autoplayHoverPause &&
                            this.autoplay();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (d.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1,
        }),
            (d.prototype.autoplay = function () {
                this.core.settings.autoplay && !this.core.state.videoPlay
                    ? (b.clearInterval(this.interval),
                      (this.interval = b.setInterval(
                          a.proxy(function () {
                              this.play();
                          }, this),
                          this.core.settings.autoplayTimeout
                      )))
                    : b.clearInterval(this.interval);
            }),
            (d.prototype.play = function () {
                return c.hidden === !0 ||
                    this.core.state.isTouch ||
                    this.core.state.isScrolling ||
                    this.core.state.isSwiping ||
                    this.core.state.inMotion
                    ? void 0
                    : this.core.settings.autoplay === !1
                    ? void b.clearInterval(this.interval)
                    : void this.core.next(this.core.settings.autoplaySpeed);
            }),
            (d.prototype.stop = function () {
                b.clearInterval(this.interval);
            }),
            (d.prototype.pause = function () {
                b.clearInterval(this.interval);
            }),
            (d.prototype.destroy = function () {
                var a, c;
                b.clearInterval(this.interval);
                for (a in this.handlers)
                    this.core.$element.off(a, this.handlers[a]);
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.autoplay = d);
    })(window.Zepto || window.jQuery, window, document),
    (function (a) {
        "use strict";
        var b = function (c) {
            (this._core = c),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to,
                }),
                (this._handlers = {
                    "prepared.owl.carousel": a.proxy(function (b) {
                        this._core.settings.dotsData &&
                            this._templates.push(
                                a(b.content)
                                    .find("[data-dot]")
                                    .andSelf("[data-dot]")
                                    .attr("data-dot")
                            );
                    }, this),
                    "add.owl.carousel": a.proxy(function (b) {
                        this._core.settings.dotsData &&
                            this._templates.splice(
                                b.position,
                                0,
                                a(b.content)
                                    .find("[data-dot]")
                                    .andSelf("[data-dot]")
                                    .attr("data-dot")
                            );
                    }, this),
                    "remove.owl.carousel prepared.owl.carousel": a.proxy(
                        function (a) {
                            this._core.settings.dotsData &&
                                this._templates.splice(a.position, 1);
                        },
                        this
                    ),
                    "change.owl.carousel": a.proxy(function (a) {
                        if (
                            "position" == a.property.name &&
                            !this._core.state.revert &&
                            !this._core.settings.loop &&
                            this._core.settings.navRewind
                        ) {
                            var b = this._core.current(),
                                c = this._core.maximum(),
                                d = this._core.minimum();
                            a.data =
                                a.property.value > c
                                    ? b >= c
                                        ? d
                                        : c
                                    : a.property.value < d
                                    ? c
                                    : a.property.value;
                        }
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        "position" == a.property.name && this.draw();
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function () {
                        this._initialized ||
                            (this.initialize(), (this._initialized = !0)),
                            this._core.trigger("refresh", null, "navigation"),
                            this.update(),
                            this.draw(),
                            this._core.trigger("refreshed", null, "navigation");
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    b.Defaults,
                    this._core.options
                )),
                this.$element.on(this._handlers);
        };
        (b.Defaults = {
            nav: !1,
            navRewind: !0,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
            controlsClass: "owl-controls",
        }),
            (b.prototype.initialize = function () {
                var b,
                    c,
                    d = this._core.settings;
                d.dotsData ||
                    (this._templates = [
                        a("<div>")
                            .addClass(d.dotClass)
                            .append(a("<span>"))
                            .prop("outerHTML"),
                    ]),
                    (d.navContainer && d.dotsContainer) ||
                        (this._controls.$container = a("<div>")
                            .addClass(d.controlsClass)
                            .appendTo(this.$element)),
                    (this._controls.$indicators = d.dotsContainer
                        ? a(d.dotsContainer)
                        : a("<div>")
                              .hide()
                              .addClass(d.dotsClass)
                              .appendTo(this._controls.$container)),
                    this._controls.$indicators.on(
                        "click",
                        "div",
                        a.proxy(function (b) {
                            var c = a(b.target)
                                .parent()
                                .is(this._controls.$indicators)
                                ? a(b.target).index()
                                : a(b.target).parent().index();
                            b.preventDefault(), this.to(c, d.dotsSpeed);
                        }, this)
                    ),
                    (b = d.navContainer
                        ? a(d.navContainer)
                        : a("<div>")
                              .addClass(d.navContainerClass)
                              .prependTo(this._controls.$container)),
                    (this._controls.$next = a("<" + d.navElement + ">")),
                    (this._controls.$previous = this._controls.$next.clone()),
                    this._controls.$previous
                        .addClass(d.navClass[0])
                        .html(d.navText[0])
                        .hide()
                        .prependTo(b)
                        .on(
                            "click",
                            a.proxy(function () {
                                this.prev(d.navSpeed);
                            }, this)
                        ),
                    this._controls.$next
                        .addClass(d.navClass[1])
                        .html(d.navText[1])
                        .hide()
                        .appendTo(b)
                        .on(
                            "click",
                            a.proxy(function () {
                                this.next(d.navSpeed);
                            }, this)
                        );
                for (c in this._overrides)
                    this._core[c] = a.proxy(this[c], this);
            }),
            (b.prototype.destroy = function () {
                var a, b, c, d;
                for (a in this._handlers)
                    this.$element.off(a, this._handlers[a]);
                for (b in this._controls) this._controls[b].remove();
                for (d in this.overides) this._core[d] = this._overrides[d];
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null);
            }),
            (b.prototype.update = function () {
                var a,
                    b,
                    c,
                    d = this._core.settings,
                    e = this._core.clones().length / 2,
                    f = e + this._core.items().length,
                    g =
                        d.center || d.autoWidth || d.dotData
                            ? 1
                            : d.dotsEach || d.items;
                if (
                    ("page" !== d.slideBy &&
                        (d.slideBy = Math.min(d.slideBy, d.items)),
                    d.dots || "page" == d.slideBy)
                )
                    for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)
                        (b >= g || 0 === b) &&
                            (this._pages.push({
                                start: a - e,
                                end: a - e + g - 1,
                            }),
                            (b = 0),
                            ++c),
                            (b += this._core.mergers(this._core.relative(a)));
            }),
            (b.prototype.draw = function () {
                var b,
                    c,
                    d = "",
                    e = this._core.settings,
                    f =
                        (this._core.$stage.children(),
                        this._core.relative(this._core.current()));
                if (
                    (!e.nav ||
                        e.loop ||
                        e.navRewind ||
                        (this._controls.$previous.toggleClass(
                            "disabled",
                            0 >= f
                        ),
                        this._controls.$next.toggleClass(
                            "disabled",
                            f >= this._core.maximum()
                        )),
                    this._controls.$previous.toggle(e.nav),
                    this._controls.$next.toggle(e.nav),
                    e.dots)
                ) {
                    if (
                        ((b =
                            this._pages.length -
                            this._controls.$indicators.children().length),
                        e.dotData && 0 !== b)
                    ) {
                        for (
                            c = 0;
                            c < this._controls.$indicators.children().length;
                            c++
                        )
                            d += this._templates[this._core.relative(c)];
                        this._controls.$indicators.html(d);
                    } else
                        b > 0
                            ? ((d = new Array(b + 1).join(this._templates[0])),
                              this._controls.$indicators.append(d))
                            : 0 > b &&
                              this._controls.$indicators
                                  .children()
                                  .slice(b)
                                  .remove();
                    this._controls.$indicators
                        .find(".active")
                        .removeClass("active"),
                        this._controls.$indicators
                            .children()
                            .eq(a.inArray(this.current(), this._pages))
                            .addClass("active");
                }
                this._controls.$indicators.toggle(e.dots);
            }),
            (b.prototype.onTrigger = function (b) {
                var c = this._core.settings;
                b.page = {
                    index: a.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size:
                        c &&
                        (c.center || c.autoWidth || c.dotData
                            ? 1
                            : c.dotsEach || c.items),
                };
            }),
            (b.prototype.current = function () {
                var b = this._core.relative(this._core.current());
                return a
                    .grep(this._pages, function (a) {
                        return a.start <= b && a.end >= b;
                    })
                    .pop();
            }),
            (b.prototype.getPosition = function (b) {
                var c,
                    d,
                    e = this._core.settings;
                return (
                    "page" == e.slideBy
                        ? ((c = a.inArray(this.current(), this._pages)),
                          (d = this._pages.length),
                          b ? ++c : --c,
                          (c = this._pages[((c % d) + d) % d].start))
                        : ((c = this._core.relative(this._core.current())),
                          (d = this._core.items().length),
                          b ? (c += e.slideBy) : (c -= e.slideBy)),
                    c
                );
            }),
            (b.prototype.next = function (b) {
                a.proxy(this._overrides.to, this._core)(
                    this.getPosition(!0),
                    b
                );
            }),
            (b.prototype.prev = function (b) {
                a.proxy(this._overrides.to, this._core)(
                    this.getPosition(!1),
                    b
                );
            }),
            (b.prototype.to = function (b, c, d) {
                var e;
                d
                    ? a.proxy(this._overrides.to, this._core)(b, c)
                    : ((e = this._pages.length),
                      a.proxy(this._overrides.to, this._core)(
                          this._pages[((b % e) + e) % e].start,
                          c
                      ));
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Navigation = b);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b) {
        "use strict";
        var c = function (d) {
            (this._core = d),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function () {
                        "URLHash" == this._core.settings.startPosition &&
                            a(b).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        var c = a(b.content)
                            .find("[data-hash]")
                            .andSelf("[data-hash]")
                            .attr("data-hash");
                        this._hashes[c] = b.content;
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    c.Defaults,
                    this._core.options
                )),
                this.$element.on(this._handlers),
                a(b).on(
                    "hashchange.owl.navigation",
                    a.proxy(function () {
                        var a = b.location.hash.substring(1),
                            c = this._core.$stage.children(),
                            d =
                                (this._hashes[a] && c.index(this._hashes[a])) ||
                                0;
                        return a ? void this._core.to(d, !1, !0) : !1;
                    }, this)
                );
        };
        (c.Defaults = { URLhashListener: !1 }),
            (c.prototype.destroy = function () {
                var c, d;
                a(b).off("hashchange.owl.navigation");
                for (c in this._handlers)
                    this._core.$element.off(c, this._handlers[c]);
                for (d in Object.getOwnPropertyNames(this))
                    "function" != typeof this[d] && (this[d] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Hash = c);
    })(window.Zepto || window.jQuery, window, document);

/*
 * jQuery FlexSlider v2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
(function (d) {
    d.flexslider = function (h, k) {
        var a = d(h),
            c = d.extend({}, d.flexslider.defaults, k),
            e = c.namespace,
            o =
                "ontouchstart" in window ||
                (window.DocumentTouch && document instanceof DocumentTouch),
            s = o ? "touchend" : "click",
            l = "vertical" === c.direction,
            m = c.reverse,
            i = 0 < c.itemWidth,
            p = "fade" === c.animation,
            r = "" !== c.asNavFor,
            f = {};
        d.data(h, "flexslider", a);
        f = {
            init: function () {
                a.animating = !1;
                a.currentSlide = c.startAt;
                a.animatingTo = a.currentSlide;
                a.atEnd = 0 === a.currentSlide || a.currentSlide === a.last;
                a.containerSelector = c.selector.substr(
                    0,
                    c.selector.search(" ")
                );
                a.slides = d(c.selector, a);
                a.container = d(a.containerSelector, a);
                a.count = a.slides.length;
                a.syncExists = 0 < d(c.sync).length;
                "slide" === c.animation && (c.animation = "swing");
                a.prop = l ? "top" : "marginLeft";
                a.args = {};
                a.manualPause = !1;
                a.transitions =
                    !c.video &&
                    !p &&
                    c.useCSS &&
                    (function () {
                        var b = document.createElement("div"),
                            c = [
                                "perspectiveProperty",
                                "WebkitPerspective",
                                "MozPerspective",
                                "OPerspective",
                                "msPerspective",
                            ],
                            d;
                        for (d in c)
                            if (b.style[c[d]] !== void 0) {
                                a.pfx = c[d]
                                    .replace("Perspective", "")
                                    .toLowerCase();
                                a.prop = "-" + a.pfx + "-transform";
                                return true;
                            }
                        return false;
                    })();
                "" !== c.controlsContainer &&
                    (a.controlsContainer =
                        0 < d(c.controlsContainer).length &&
                        d(c.controlsContainer));
                "" !== c.manualControls &&
                    (a.manualControls =
                        0 < d(c.manualControls).length && d(c.manualControls));
                c.randomize &&
                    (a.slides.sort(function () {
                        return Math.round(Math.random()) - 0.5;
                    }),
                    a.container.empty().append(a.slides));
                a.doMath();
                r && f.asNav.setup();
                a.setup("init");
                c.controlNav && f.controlNav.setup();
                c.directionNav && f.directionNav.setup();
                c.keyboard &&
                    (1 === d(a.containerSelector).length ||
                        c.multipleKeyboard) &&
                    d(document).bind("keyup", function (b) {
                        b = b.keyCode;
                        if (!a.animating && (b === 39 || b === 37)) {
                            b =
                                b === 39
                                    ? a.getTarget("next")
                                    : b === 37
                                    ? a.getTarget("prev")
                                    : false;
                            a.flexAnimate(b, c.pauseOnAction);
                        }
                    });
                c.mousewheel &&
                    a.bind("mousewheel", function (b, g) {
                        b.preventDefault();
                        var d =
                            g < 0 ? a.getTarget("next") : a.getTarget("prev");
                        a.flexAnimate(d, c.pauseOnAction);
                    });
                c.pausePlay && f.pausePlay.setup();
                c.slideshow &&
                    (c.pauseOnHover &&
                        a.hover(
                            function () {
                                a.pause();
                            },
                            function () {
                                a.manualPause || a.play();
                            }
                        ),
                    0 < c.initDelay
                        ? setTimeout(a.play, c.initDelay)
                        : a.play());
                o && c.touch && f.touch();
                (!p || (p && c.smoothHeight)) &&
                    d(window).bind("resize focus", f.resize);
                setTimeout(function () {
                    c.start(a);
                }, 200);
            },
            asNav: {
                setup: function () {
                    a.asNav = !0;
                    a.animatingTo = Math.floor(a.currentSlide / a.move);
                    a.currentItem = a.currentSlide;
                    a.slides
                        .removeClass(e + "active-slide")
                        .eq(a.currentItem)
                        .addClass(e + "active-slide");
                    a.slides.click(function (b) {
                        b.preventDefault();
                        var b = d(this),
                            g = b.index();
                        !d(c.asNavFor).data("flexslider").animating &&
                            !b.hasClass("active") &&
                            ((a.direction =
                                a.currentItem < g ? "next" : "prev"),
                            a.flexAnimate(g, c.pauseOnAction, !1, !0, !0));
                    });
                },
            },
            controlNav: {
                setup: function () {
                    a.manualControls
                        ? f.controlNav.setupManual()
                        : f.controlNav.setupPaging();
                },
                setupPaging: function () {
                    var b = 1,
                        g;
                    a.controlNavScaffold = d(
                        '<ol class="' +
                            e +
                            "control-nav " +
                            e +
                            ("thumbnails" === c.controlNav
                                ? "control-thumbs"
                                : "control-paging") +
                            '"></ol>'
                    );
                    if (1 < a.pagingCount)
                        for (var q = 0; q < a.pagingCount; q++)
                            (g =
                                "thumbnails" === c.controlNav
                                    ? '<img src="' +
                                      a.slides.eq(q).attr("data-thumb") +
                                      '"/>'
                                    : "<a>" + b + "</a>"),
                                a.controlNavScaffold.append(
                                    "<li>" + g + "</li>"
                                ),
                                b++;
                    a.controlsContainer
                        ? d(a.controlsContainer).append(a.controlNavScaffold)
                        : a.append(a.controlNavScaffold);
                    f.controlNav.set();
                    f.controlNav.active();
                    a.controlNavScaffold.delegate("a, img", s, function (b) {
                        b.preventDefault();
                        var b = d(this),
                            g = a.controlNav.index(b);
                        b.hasClass(e + "active") ||
                            ((a.direction =
                                g > a.currentSlide ? "next" : "prev"),
                            a.flexAnimate(g, c.pauseOnAction));
                    });
                    o &&
                        a.controlNavScaffold.delegate(
                            "a",
                            "click touchstart",
                            function (a) {
                                a.preventDefault();
                            }
                        );
                },
                setupManual: function () {
                    a.controlNav = a.manualControls;
                    f.controlNav.active();
                    a.controlNav.live(s, function (b) {
                        b.preventDefault();
                        var b = d(this),
                            g = a.controlNav.index(b);
                        b.hasClass(e + "active") ||
                            (g > a.currentSlide
                                ? (a.direction = "next")
                                : (a.direction = "prev"),
                            a.flexAnimate(g, c.pauseOnAction));
                    });
                    o &&
                        a.controlNav.live("click touchstart", function (a) {
                            a.preventDefault();
                        });
                },
                set: function () {
                    a.controlNav = d(
                        "." +
                            e +
                            "control-nav li " +
                            ("thumbnails" === c.controlNav ? "img" : "a"),
                        a.controlsContainer ? a.controlsContainer : a
                    );
                },
                active: function () {
                    a.controlNav
                        .removeClass(e + "active")
                        .eq(a.animatingTo)
                        .addClass(e + "active");
                },
                update: function (b, c) {
                    1 < a.pagingCount && "add" === b
                        ? a.controlNavScaffold.append(
                              d("<li><a>" + a.count + "</a></li>")
                          )
                        : 1 === a.pagingCount
                        ? a.controlNavScaffold.find("li").remove()
                        : a.controlNav.eq(c).closest("li").remove();
                    f.controlNav.set();
                    1 < a.pagingCount && a.pagingCount !== a.controlNav.length
                        ? a.update(c, b)
                        : f.controlNav.active();
                },
            },
            directionNav: {
                setup: function () {
                    var b = d(
                        '<ul class="' +
                            e +
                            'direction-nav"><li><a class="' +
                            e +
                            'prev" href="#">' +
                            c.prevText +
                            '</a></li><li><a class="' +
                            e +
                            'next" href="#">' +
                            c.nextText +
                            "</a></li></ul>"
                    );
                    a.controlsContainer
                        ? (d(a.controlsContainer).append(b),
                          (a.directionNav = d(
                              "." + e + "direction-nav li a",
                              a.controlsContainer
                          )))
                        : (a.append(b),
                          (a.directionNav = d(
                              "." + e + "direction-nav li a",
                              a
                          )));
                    f.directionNav.update();
                    a.directionNav.bind(s, function (b) {
                        b.preventDefault();
                        b = d(this).hasClass(e + "next")
                            ? a.getTarget("next")
                            : a.getTarget("prev");
                        a.flexAnimate(b, c.pauseOnAction);
                    });
                    o &&
                        a.directionNav.bind("click touchstart", function (a) {
                            a.preventDefault();
                        });
                },
                update: function () {
                    var b = e + "disabled";
                    c.animationLoop ||
                        (1 === a.pagingCount
                            ? a.directionNav.addClass(b)
                            : 0 === a.animatingTo
                            ? a.directionNav
                                  .removeClass(b)
                                  .filter("." + e + "prev")
                                  .addClass(b)
                            : a.animatingTo === a.last
                            ? a.directionNav
                                  .removeClass(b)
                                  .filter("." + e + "next")
                                  .addClass(b)
                            : a.directionNav.removeClass(b));
                },
            },
            pausePlay: {
                setup: function () {
                    var b = d('<div class="' + e + 'pauseplay"><a></a></div>');
                    a.controlsContainer
                        ? (a.controlsContainer.append(b),
                          (a.pausePlay = d(
                              "." + e + "pauseplay a",
                              a.controlsContainer
                          )))
                        : (a.append(b),
                          (a.pausePlay = d("." + e + "pauseplay a", a)));
                    f.pausePlay.update(c.slideshow ? e + "pause" : e + "play");
                    a.pausePlay.bind(s, function (b) {
                        b.preventDefault();
                        if (d(this).hasClass(e + "pause")) {
                            a.pause();
                            a.manualPause = true;
                        } else {
                            a.play();
                            a.manualPause = false;
                        }
                    });
                    o &&
                        a.pausePlay.bind("click touchstart", function (a) {
                            a.preventDefault();
                        });
                },
                update: function (b) {
                    "play" === b
                        ? a.pausePlay
                              .removeClass(e + "pause")
                              .addClass(e + "play")
                              .text(c.playText)
                        : a.pausePlay
                              .removeClass(e + "play")
                              .addClass(e + "pause")
                              .text(c.pauseText);
                },
            },
            touch: function () {
                function b(b) {
                    j = l ? d - b.touches[0].pageY : d - b.touches[0].pageX;
                    o = l
                        ? Math.abs(j) < Math.abs(b.touches[0].pageX - e)
                        : Math.abs(j) < Math.abs(b.touches[0].pageY - e);
                    if (!o || 500 < Number(new Date()) - k)
                        b.preventDefault(),
                            !p &&
                                a.transitions &&
                                (c.animationLoop ||
                                    (j /=
                                        (0 === a.currentSlide && 0 > j) ||
                                        (a.currentSlide === a.last && 0 < j)
                                            ? Math.abs(j) / n + 2
                                            : 1),
                                a.setProps(f + j, "setTouch"));
                }
                function g() {
                    if (a.animatingTo === a.currentSlide && !o && null !== j) {
                        var i = m ? -j : j,
                            l =
                                0 < i
                                    ? a.getTarget("next")
                                    : a.getTarget("prev");
                        a.canAdvance(l) &&
                        ((550 > Number(new Date()) - k && 20 < Math.abs(i)) ||
                            Math.abs(i) > n / 2)
                            ? a.flexAnimate(l, c.pauseOnAction)
                            : a.flexAnimate(
                                  a.currentSlide,
                                  c.pauseOnAction,
                                  !0
                              );
                    }
                    h.removeEventListener("touchmove", b, !1);
                    h.removeEventListener("touchend", g, !1);
                    f = j = e = d = null;
                }
                var d,
                    e,
                    f,
                    n,
                    j,
                    k,
                    o = !1;
                h.addEventListener(
                    "touchstart",
                    function (j) {
                        a.animating
                            ? j.preventDefault()
                            : 1 === j.touches.length &&
                              (a.pause(),
                              (n = l ? a.h : a.w),
                              (k = Number(new Date())),
                              (f =
                                  i && m && a.animatingTo === a.last
                                      ? 0
                                      : i && m
                                      ? a.limit -
                                        (a.itemW + c.itemMargin) *
                                            a.move *
                                            a.animatingTo
                                      : i && a.currentSlide === a.last
                                      ? a.limit
                                      : i
                                      ? (a.itemW + c.itemMargin) *
                                        a.move *
                                        a.currentSlide
                                      : m
                                      ? (a.last -
                                            a.currentSlide +
                                            a.cloneOffset) *
                                        n
                                      : (a.currentSlide + a.cloneOffset) * n),
                              (d = l ? j.touches[0].pageY : j.touches[0].pageX),
                              (e = l ? j.touches[0].pageX : j.touches[0].pageY),
                              h.addEventListener("touchmove", b, !1),
                              h.addEventListener("touchend", g, !1));
                    },
                    !1
                );
            },
            resize: function () {
                !a.animating &&
                    a.is(":visible") &&
                    (i || a.doMath(),
                    p
                        ? f.smoothHeight()
                        : i
                        ? (a.slides.width(a.computedW),
                          a.update(a.pagingCount),
                          a.setProps())
                        : l
                        ? (a.viewport.height(a.h), a.setProps(a.h, "setTotal"))
                        : (c.smoothHeight && f.smoothHeight(),
                          a.newSlides.width(a.computedW),
                          a.setProps(a.computedW, "setTotal")));
            },
            smoothHeight: function (b) {
                if (!l || p) {
                    var c = p ? a : a.viewport;
                    b
                        ? c.animate(
                              { height: a.slides.eq(a.animatingTo).height() },
                              b
                          )
                        : c.height(a.slides.eq(a.animatingTo).height());
                }
            },
            sync: function (b) {
                var g = d(c.sync).data("flexslider"),
                    e = a.animatingTo;
                switch (b) {
                    case "animate":
                        g.flexAnimate(e, c.pauseOnAction, !1, !0);
                        break;
                    case "play":
                        !g.playing && !g.asNav && g.play();
                        break;
                    case "pause":
                        g.pause();
                }
            },
        };
        a.flexAnimate = function (b, g, q, h, k) {
            if (!a.animating && (a.canAdvance(b) || q) && a.is(":visible")) {
                if (r && h)
                    if (
                        ((q = d(c.asNavFor).data("flexslider")),
                        (a.atEnd = 0 === b || b === a.count - 1),
                        q.flexAnimate(b, !0, !1, !0, k),
                        (a.direction = a.currentItem < b ? "next" : "prev"),
                        (q.direction = a.direction),
                        Math.ceil((b + 1) / a.visible) - 1 !== a.currentSlide &&
                            0 !== b)
                    )
                        (a.currentItem = b),
                            a.slides
                                .removeClass(e + "active-slide")
                                .eq(b)
                                .addClass(e + "active-slide"),
                            (b = Math.floor(b / a.visible));
                    else
                        return (
                            (a.currentItem = b),
                            a.slides
                                .removeClass(e + "active-slide")
                                .eq(b)
                                .addClass(e + "active-slide"),
                            !1
                        );
                a.animating = !0;
                a.animatingTo = b;
                c.before(a);
                g && a.pause();
                a.syncExists && !k && f.sync("animate");
                c.controlNav && f.controlNav.active();
                i ||
                    a.slides
                        .removeClass(e + "active-slide")
                        .eq(b)
                        .addClass(e + "active-slide");
                a.atEnd = 0 === b || b === a.last;
                c.directionNav && f.directionNav.update();
                b === a.last && (c.end(a), c.animationLoop || a.pause());
                if (p)
                    a.slides
                        .eq(a.currentSlide)
                        .fadeOut(c.animationSpeed, c.easing),
                        a.slides
                            .eq(b)
                            .fadeIn(c.animationSpeed, c.easing, a.wrapup);
                else {
                    var n = l
                        ? a.slides.filter(":first").height()
                        : a.computedW;
                    i
                        ? ((b =
                              c.itemWidth > a.w
                                  ? 2 * c.itemMargin
                                  : c.itemMargin),
                          (b = (a.itemW + b) * a.move * a.animatingTo),
                          (b = b > a.limit && 1 !== a.visible ? a.limit : b))
                        : (b =
                              0 === a.currentSlide &&
                              b === a.count - 1 &&
                              c.animationLoop &&
                              "next" !== a.direction
                                  ? m
                                      ? (a.count + a.cloneOffset) * n
                                      : 0
                                  : a.currentSlide === a.last &&
                                    0 === b &&
                                    c.animationLoop &&
                                    "prev" !== a.direction
                                  ? m
                                      ? 0
                                      : (a.count + 1) * n
                                  : m
                                  ? (a.count - 1 - b + a.cloneOffset) * n
                                  : (b + a.cloneOffset) * n);
                    a.setProps(b, "", c.animationSpeed);
                    if (a.transitions) {
                        if (!c.animationLoop || !a.atEnd)
                            (a.animating = !1),
                                (a.currentSlide = a.animatingTo);
                        a.container.unbind("webkitTransitionEnd transitionend");
                        a.container.bind(
                            "webkitTransitionEnd transitionend",
                            function () {
                                a.wrapup(n);
                            }
                        );
                    } else
                        a.container.animate(
                            a.args,
                            c.animationSpeed,
                            c.easing,
                            function () {
                                a.wrapup(n);
                            }
                        );
                }
                c.smoothHeight && f.smoothHeight(c.animationSpeed);
            }
        };
        a.wrapup = function (b) {
            !p &&
                !i &&
                (0 === a.currentSlide &&
                a.animatingTo === a.last &&
                c.animationLoop
                    ? a.setProps(b, "jumpEnd")
                    : a.currentSlide === a.last &&
                      0 === a.animatingTo &&
                      c.animationLoop &&
                      a.setProps(b, "jumpStart"));
            a.animating = !1;
            a.currentSlide = a.animatingTo;
            c.after(a);
        };
        a.animateSlides = function () {
            a.animating || a.flexAnimate(a.getTarget("next"));
        };
        a.pause = function () {
            clearInterval(a.animatedSlides);
            a.playing = !1;
            c.pausePlay && f.pausePlay.update("play");
            a.syncExists && f.sync("pause");
        };
        a.play = function () {
            a.animatedSlides = setInterval(a.animateSlides, c.slideshowSpeed);
            a.playing = !0;
            c.pausePlay && f.pausePlay.update("pause");
            a.syncExists && f.sync("play");
        };
        a.canAdvance = function (b) {
            var d = r ? a.pagingCount - 1 : a.last;
            return r &&
                0 === a.currentItem &&
                b === a.pagingCount - 1 &&
                "next" !== a.direction
                ? !1
                : b === a.currentSlide && !r
                ? !1
                : c.animationLoop
                ? !0
                : a.atEnd &&
                  0 === a.currentSlide &&
                  b === d &&
                  "next" !== a.direction
                ? !1
                : a.atEnd &&
                  a.currentSlide === d &&
                  0 === b &&
                  "next" === a.direction
                ? !1
                : !0;
        };
        a.getTarget = function (b) {
            a.direction = b;
            return "next" === b
                ? a.currentSlide === a.last
                    ? 0
                    : a.currentSlide + 1
                : 0 === a.currentSlide
                ? a.last
                : a.currentSlide - 1;
        };
        a.setProps = function (b, d, e) {
            var f = (function () {
                var e = b
                    ? b
                    : (a.itemW + c.itemMargin) * a.move * a.animatingTo;
                return (
                    -1 *
                        (function () {
                            if (i)
                                return "setTouch" === d
                                    ? b
                                    : m && a.animatingTo === a.last
                                    ? 0
                                    : m
                                    ? a.limit -
                                      (a.itemW + c.itemMargin) *
                                          a.move *
                                          a.animatingTo
                                    : a.animatingTo === a.last
                                    ? a.limit
                                    : e;
                            switch (d) {
                                case "setTotal":
                                    return m
                                        ? (a.count -
                                              1 -
                                              a.currentSlide +
                                              a.cloneOffset) *
                                              b
                                        : (a.currentSlide + a.cloneOffset) * b;
                                case "setTouch":
                                    return b;
                                case "jumpEnd":
                                    return m ? b : a.count * b;
                                case "jumpStart":
                                    return m ? a.count * b : b;
                                default:
                                    return b;
                            }
                        })() +
                    "px"
                );
            })();
            a.transitions &&
                ((f = l
                    ? "translate3d(0," + f + ",0)"
                    : "translate3d(" + f + ",0,0)"),
                (e = void 0 !== e ? e / 1e3 + "s" : "0s"),
                a.container.css("-" + a.pfx + "-transition-duration", e));
            a.args[a.prop] = f;
            (a.transitions || void 0 === e) && a.container.css(a.args);
        };
        a.setup = function (b) {
            if (p)
                a.slides.css({
                    width: "100%",
                    float: "left",
                    marginRight: "-100%",
                    position: "relative",
                }),
                    "init" === b &&
                        a.slides
                            .eq(a.currentSlide)
                            .fadeIn(c.animationSpeed, c.easing),
                    c.smoothHeight && f.smoothHeight();
            else {
                var g, h;
                "init" === b &&
                    ((a.viewport = d('<div class="flex-viewport"></div>')
                        .css({ overflow: "hidden", position: "relative" })
                        .appendTo(a)
                        .append(a.container)),
                    (a.cloneCount = 0),
                    (a.cloneOffset = 0),
                    m &&
                        ((h = d.makeArray(a.slides).reverse()),
                        (a.slides = d(h)),
                        a.container.empty().append(a.slides)));
                c.animationLoop &&
                    !i &&
                    ((a.cloneCount = 2),
                    (a.cloneOffset = 1),
                    "init" !== b && a.container.find(".clone").remove(),
                    a.container
                        .append(a.slides.first().clone().addClass("clone"))
                        .prepend(a.slides.last().clone().addClass("clone")));
                a.newSlides = d(c.selector, a);
                g = m
                    ? a.count - 1 - a.currentSlide + a.cloneOffset
                    : a.currentSlide + a.cloneOffset;
                l && !i
                    ? (a.container
                          .height(200 * (a.count + a.cloneCount) + "%")
                          .css("position", "absolute")
                          .width("100%"),
                      setTimeout(
                          function () {
                              a.newSlides.css({ display: "block" });
                              a.doMath();
                              a.viewport.height(a.h);
                              a.setProps(g * a.h, "init");
                          },
                          "init" === b ? 100 : 0
                      ))
                    : (a.container.width(200 * (a.count + a.cloneCount) + "%"),
                      a.setProps(g * a.computedW, "init"),
                      setTimeout(
                          function () {
                              a.doMath();
                              a.newSlides.css({
                                  width: a.computedW,
                                  float: "left",
                                  display: "block",
                              });
                              c.smoothHeight && f.smoothHeight();
                          },
                          "init" === b ? 100 : 0
                      ));
            }
            i ||
                a.slides
                    .removeClass(e + "active-slide")
                    .eq(a.currentSlide)
                    .addClass(e + "active-slide");
        };
        a.doMath = function () {
            var b = a.slides.first(),
                d = c.itemMargin,
                e = c.minItems,
                f = c.maxItems;
            a.w = a.width();
            a.h = b.height();
            a.boxPadding = b.outerWidth() - b.width();
            i
                ? ((a.itemT = c.itemWidth + d),
                  (a.minW = e ? e * a.itemT : a.w),
                  (a.maxW = f ? f * a.itemT : a.w),
                  (a.itemW =
                      a.minW > a.w
                          ? (a.w - d * e) / e
                          : a.maxW < a.w
                          ? (a.w - d * f) / f
                          : c.itemWidth > a.w
                          ? a.w
                          : c.itemWidth),
                  (a.visible = Math.floor(a.w / (a.itemW + d))),
                  (a.move =
                      0 < c.move && c.move < a.visible ? c.move : a.visible),
                  (a.pagingCount = Math.ceil(
                      (a.count - a.visible) / a.move + 1
                  )),
                  (a.last = a.pagingCount - 1),
                  (a.limit =
                      1 === a.pagingCount
                          ? 0
                          : c.itemWidth > a.w
                          ? (a.itemW + 2 * d) * a.count - a.w - d
                          : (a.itemW + d) * a.count - a.w))
                : ((a.itemW = a.w),
                  (a.pagingCount = a.count),
                  (a.last = a.count - 1));
            a.computedW = a.itemW - a.boxPadding;
        };
        a.update = function (b, d) {
            a.doMath();
            i ||
                (b < a.currentSlide
                    ? (a.currentSlide += 1)
                    : b <= a.currentSlide && 0 !== b && (a.currentSlide -= 1),
                (a.animatingTo = a.currentSlide));
            if (c.controlNav && !a.manualControls)
                if (("add" === d && !i) || a.pagingCount > a.controlNav.length)
                    f.controlNav.update("add");
                else if (
                    ("remove" === d && !i) ||
                    a.pagingCount < a.controlNav.length
                )
                    i &&
                        a.currentSlide > a.last &&
                        ((a.currentSlide -= 1), (a.animatingTo -= 1)),
                        f.controlNav.update("remove", a.last);
            c.directionNav && f.directionNav.update();
        };
        a.addSlide = function (b, e) {
            var f = d(b);
            a.count += 1;
            a.last = a.count - 1;
            l && m
                ? void 0 !== e
                    ? a.slides.eq(a.count - e).after(f)
                    : a.container.prepend(f)
                : void 0 !== e
                ? a.slides.eq(e).before(f)
                : a.container.append(f);
            a.update(e, "add");
            a.slides = d(c.selector + ":not(.clone)", a);
            a.setup();
            c.added(a);
        };
        a.removeSlide = function (b) {
            var e = isNaN(b) ? a.slides.index(d(b)) : b;
            a.count -= 1;
            a.last = a.count - 1;
            isNaN(b)
                ? d(b, a.slides).remove()
                : l && m
                ? a.slides.eq(a.last).remove()
                : a.slides.eq(b).remove();
            a.doMath();
            a.update(e, "remove");
            a.slides = d(c.selector + ":not(.clone)", a);
            a.setup();
            c.removed(a);
        };
        f.init();
    };
    d.flexslider.defaults = {
        namespace: "flex-",
        selector: ".slides > li",
        animation: "fade",
        easing: "swing",
        direction: "horizontal",
        reverse: !1,
        animationLoop: !0,
        smoothHeight: !1,
        startAt: 0,
        slideshow: !0,
        slideshowSpeed: 7e3,
        animationSpeed: 600,
        initDelay: 0,
        randomize: !1,
        pauseOnAction: !0,
        pauseOnHover: !1,
        useCSS: !0,
        touch: !0,
        video: !1,
        controlNav: !0,
        directionNav: !0,
        prevText: "",
        nextText: "",
        keyboard: !0,
        multipleKeyboard: !1,
        mousewheel: !1,
        pausePlay: !1,
        pauseText: "Pause",
        playText: "Play",
        controlsContainer: "",
        manualControls: "",
        sync: "",
        asNavFor: "",
        itemWidth: 0,
        itemMargin: 0,
        minItems: 0,
        maxItems: 0,
        move: 0,
        start: function () {},
        before: function () {},
        after: function () {},
        end: function () {},
        added: function () {},
        removed: function () {},
    };
    d.fn.flexslider = function (h) {
        h = h || {};
        if ("object" === typeof h)
            return this.each(function () {
                var a = d(this),
                    c = a.find(h.selector ? h.selector : ".slides > li");
                1 === c.length
                    ? (c.fadeIn(400), h.start && h.start(a))
                    : void 0 === a.data("flexslider") &&
                      new d.flexslider(this, h);
            });
        var k = d(this).data("flexslider");
        switch (h) {
            case "play":
                k.play();
                break;
            case "pause":
                k.pause();
                break;
            case "next":
                k.flexAnimate(k.getTarget("next"), !0);
                break;
            case "prev":
            case "previous":
                k.flexAnimate(k.getTarget("prev"), !0);
                break;
            default:
                "number" === typeof h && k.flexAnimate(h, !0);
        }
    };
})(jQuery);

/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/ (function () {
    var a,
        b,
        c,
        d,
        e,
        f = function (a, b) {
            return function () {
                return a.apply(b, arguments);
            };
        },
        g =
            [].indexOf ||
            function (a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (b in this && this[b] === a) return b;
                return -1;
            };
    (b = (function () {
        function a() {}
        return (
            (a.prototype.extend = function (a, b) {
                var c, d;
                for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
                return a;
            }),
            (a.prototype.isMobile = function (a) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    a
                );
            }),
            (a.prototype.createEvent = function (a, b, c, d) {
                var e;
                return (
                    null == b && (b = !1),
                    null == c && (c = !1),
                    null == d && (d = null),
                    null != document.createEvent
                        ? ((e = document.createEvent("CustomEvent")),
                          e.initCustomEvent(a, b, c, d))
                        : null != document.createEventObject
                        ? ((e = document.createEventObject()),
                          (e.eventType = a))
                        : (e.eventName = a),
                    e
                );
            }),
            (a.prototype.emitEvent = function (a, b) {
                return null != a.dispatchEvent
                    ? a.dispatchEvent(b)
                    : b in (null != a)
                    ? a[b]()
                    : "on" + b in (null != a)
                    ? a["on" + b]()
                    : void 0;
            }),
            (a.prototype.addEvent = function (a, b, c) {
                return null != a.addEventListener
                    ? a.addEventListener(b, c, !1)
                    : null != a.attachEvent
                    ? a.attachEvent("on" + b, c)
                    : (a[b] = c);
            }),
            (a.prototype.removeEvent = function (a, b, c) {
                return null != a.removeEventListener
                    ? a.removeEventListener(b, c, !1)
                    : null != a.detachEvent
                    ? a.detachEvent("on" + b, c)
                    : delete a[b];
            }),
            (a.prototype.innerHeight = function () {
                return "innerHeight" in window
                    ? window.innerHeight
                    : document.documentElement.clientHeight;
            }),
            a
        );
    })()),
        (c =
            this.WeakMap ||
            this.MozWeakMap ||
            (c = (function () {
                function a() {
                    (this.keys = []), (this.values = []);
                }
                return (
                    (a.prototype.get = function (a) {
                        var b, c, d, e, f;
                        for (
                            f = this.keys, b = d = 0, e = f.length;
                            e > d;
                            b = ++d
                        )
                            if (((c = f[b]), c === a)) return this.values[b];
                    }),
                    (a.prototype.set = function (a, b) {
                        var c, d, e, f, g;
                        for (
                            g = this.keys, c = e = 0, f = g.length;
                            f > e;
                            c = ++e
                        )
                            if (((d = g[c]), d === a))
                                return void (this.values[c] = b);
                        return this.keys.push(a), this.values.push(b);
                    }),
                    a
                );
            })())),
        (a =
            this.MutationObserver ||
            this.WebkitMutationObserver ||
            this.MozMutationObserver ||
            (a = (function () {
                function a() {
                    "undefined" != typeof console &&
                        null !== console &&
                        console.warn(
                            "MutationObserver is not supported by your browser."
                        ),
                        "undefined" != typeof console &&
                            null !== console &&
                            console.warn(
                                "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                            );
                }
                return (
                    (a.notSupported = !0),
                    (a.prototype.observe = function () {}),
                    a
                );
            })())),
        (d =
            this.getComputedStyle ||
            function (a, b) {
                return (
                    (this.getPropertyValue = function (b) {
                        var c;
                        return (
                            "float" === b && (b = "styleFloat"),
                            e.test(b) &&
                                b.replace(e, function (a, b) {
                                    return b.toUpperCase();
                                }),
                            (null != (c = a.currentStyle) ? c[b] : void 0) ||
                                null
                        );
                    }),
                    this
                );
            }),
        (e = /(\-([a-z]){1})/g),
        (this.WOW = (function () {
            function e(a) {
                null == a && (a = {}),
                    (this.scrollCallback = f(this.scrollCallback, this)),
                    (this.scrollHandler = f(this.scrollHandler, this)),
                    (this.resetAnimation = f(this.resetAnimation, this)),
                    (this.start = f(this.start, this)),
                    (this.scrolled = !0),
                    (this.config = this.util().extend(a, this.defaults)),
                    null != a.scrollContainer &&
                        (this.config.scrollContainer = document.querySelector(
                            a.scrollContainer
                        )),
                    (this.animationNameCache = new c()),
                    (this.wowEvent = this.util().createEvent(
                        this.config.boxClass
                    ));
            }
            return (
                (e.prototype.defaults = {
                    boxClass: "wow",
                    animateClass: "animated",
                    offset: 0,
                    mobile: !0,
                    live: !0,
                    callback: null,
                    scrollContainer: null,
                }),
                (e.prototype.init = function () {
                    var a;
                    return (
                        (this.element = window.document.documentElement),
                        "interactive" === (a = document.readyState) ||
                        "complete" === a
                            ? this.start()
                            : this.util().addEvent(
                                  document,
                                  "DOMContentLoaded",
                                  this.start
                              ),
                        (this.finished = [])
                    );
                }),
                (e.prototype.start = function () {
                    var b, c, d, e;
                    if (
                        ((this.stopped = !1),
                        (this.boxes = function () {
                            var a, c, d, e;
                            for (
                                d = this.element.querySelectorAll(
                                    "." + this.config.boxClass
                                ),
                                    e = [],
                                    a = 0,
                                    c = d.length;
                                c > a;
                                a++
                            )
                                (b = d[a]), e.push(b);
                            return e;
                        }.call(this)),
                        (this.all = function () {
                            var a, c, d, e;
                            for (
                                d = this.boxes, e = [], a = 0, c = d.length;
                                c > a;
                                a++
                            )
                                (b = d[a]), e.push(b);
                            return e;
                        }.call(this)),
                        this.boxes.length)
                    )
                        if (this.disabled()) this.resetStyle();
                        else
                            for (
                                e = this.boxes, c = 0, d = e.length;
                                d > c;
                                c++
                            )
                                (b = e[c]), this.applyStyle(b, !0);
                    return (
                        this.disabled() ||
                            (this.util().addEvent(
                                this.config.scrollContainer || window,
                                "scroll",
                                this.scrollHandler
                            ),
                            this.util().addEvent(
                                window,
                                "resize",
                                this.scrollHandler
                            ),
                            (this.interval = setInterval(
                                this.scrollCallback,
                                50
                            ))),
                        this.config.live
                            ? new a(
                                  (function (a) {
                                      return function (b) {
                                          var c, d, e, f, g;
                                          for (
                                              g = [], c = 0, d = b.length;
                                              d > c;
                                              c++
                                          )
                                              (f = b[c]),
                                                  g.push(
                                                      function () {
                                                          var a, b, c, d;
                                                          for (
                                                              c =
                                                                  f.addedNodes ||
                                                                  [],
                                                                  d = [],
                                                                  a = 0,
                                                                  b = c.length;
                                                              b > a;
                                                              a++
                                                          )
                                                              (e = c[a]),
                                                                  d.push(
                                                                      this.doSync(
                                                                          e
                                                                      )
                                                                  );
                                                          return d;
                                                      }.call(a)
                                                  );
                                          return g;
                                      };
                                  })(this)
                              ).observe(document.body, {
                                  childList: !0,
                                  subtree: !0,
                              })
                            : void 0
                    );
                }),
                (e.prototype.stop = function () {
                    return (
                        (this.stopped = !0),
                        this.util().removeEvent(
                            this.config.scrollContainer || window,
                            "scroll",
                            this.scrollHandler
                        ),
                        this.util().removeEvent(
                            window,
                            "resize",
                            this.scrollHandler
                        ),
                        null != this.interval
                            ? clearInterval(this.interval)
                            : void 0
                    );
                }),
                (e.prototype.sync = function (b) {
                    return a.notSupported ? this.doSync(this.element) : void 0;
                }),
                (e.prototype.doSync = function (a) {
                    var b, c, d, e, f;
                    if ((null == a && (a = this.element), 1 === a.nodeType)) {
                        for (
                            a = a.parentNode || a,
                                e = a.querySelectorAll(
                                    "." + this.config.boxClass
                                ),
                                f = [],
                                c = 0,
                                d = e.length;
                            d > c;
                            c++
                        )
                            (b = e[c]),
                                g.call(this.all, b) < 0
                                    ? (this.boxes.push(b),
                                      this.all.push(b),
                                      this.stopped || this.disabled()
                                          ? this.resetStyle()
                                          : this.applyStyle(b, !0),
                                      f.push((this.scrolled = !0)))
                                    : f.push(void 0);
                        return f;
                    }
                }),
                (e.prototype.show = function (a) {
                    return (
                        this.applyStyle(a),
                        (a.className =
                            a.className + " " + this.config.animateClass),
                        null != this.config.callback && this.config.callback(a),
                        this.util().emitEvent(a, this.wowEvent),
                        this.util().addEvent(
                            a,
                            "animationend",
                            this.resetAnimation
                        ),
                        this.util().addEvent(
                            a,
                            "oanimationend",
                            this.resetAnimation
                        ),
                        this.util().addEvent(
                            a,
                            "webkitAnimationEnd",
                            this.resetAnimation
                        ),
                        this.util().addEvent(
                            a,
                            "MSAnimationEnd",
                            this.resetAnimation
                        ),
                        a
                    );
                }),
                (e.prototype.applyStyle = function (a, b) {
                    var c, d, e;
                    return (
                        (d = a.getAttribute("data-wow-duration")),
                        (c = a.getAttribute("data-wow-delay")),
                        (e = a.getAttribute("data-wow-iteration")),
                        this.animate(
                            (function (f) {
                                return function () {
                                    return f.customStyle(a, b, d, c, e);
                                };
                            })(this)
                        )
                    );
                }),
                (e.prototype.animate = (function () {
                    return "requestAnimationFrame" in window
                        ? function (a) {
                              return window.requestAnimationFrame(a);
                          }
                        : function (a) {
                              return a();
                          };
                })()),
                (e.prototype.resetStyle = function () {
                    var a, b, c, d, e;
                    for (
                        d = this.boxes, e = [], b = 0, c = d.length;
                        c > b;
                        b++
                    )
                        (a = d[b]), e.push((a.style.visibility = "visible"));
                    return e;
                }),
                (e.prototype.resetAnimation = function (a) {
                    var b;
                    return a.type.toLowerCase().indexOf("animationend") >= 0
                        ? ((b = a.target || a.srcElement),
                          (b.className = b.className
                              .replace(this.config.animateClass, "")
                              .trim()))
                        : void 0;
                }),
                (e.prototype.customStyle = function (a, b, c, d, e) {
                    return (
                        b && this.cacheAnimationName(a),
                        (a.style.visibility = b ? "hidden" : "visible"),
                        c && this.vendorSet(a.style, { animationDuration: c }),
                        d && this.vendorSet(a.style, { animationDelay: d }),
                        e &&
                            this.vendorSet(a.style, {
                                animationIterationCount: e,
                            }),
                        this.vendorSet(a.style, {
                            animationName: b
                                ? "none"
                                : this.cachedAnimationName(a),
                        }),
                        a
                    );
                }),
                (e.prototype.vendors = ["moz", "webkit"]),
                (e.prototype.vendorSet = function (a, b) {
                    var c, d, e, f;
                    d = [];
                    for (c in b)
                        (e = b[c]),
                            (a["" + c] = e),
                            d.push(
                                function () {
                                    var b, d, g, h;
                                    for (
                                        g = this.vendors,
                                            h = [],
                                            b = 0,
                                            d = g.length;
                                        d > b;
                                        b++
                                    )
                                        (f = g[b]),
                                            h.push(
                                                (a[
                                                    "" +
                                                        f +
                                                        c
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        c.substr(1)
                                                ] = e)
                                            );
                                    return h;
                                }.call(this)
                            );
                    return d;
                }),
                (e.prototype.vendorCSS = function (a, b) {
                    var c, e, f, g, h, i;
                    for (
                        h = d(a),
                            g = h.getPropertyCSSValue(b),
                            f = this.vendors,
                            c = 0,
                            e = f.length;
                        e > c;
                        c++
                    )
                        (i = f[c]),
                            (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
                    return g;
                }),
                (e.prototype.animationName = function (a) {
                    var b;
                    try {
                        b = this.vendorCSS(a, "animation-name").cssText;
                    } catch (c) {
                        b = d(a).getPropertyValue("animation-name");
                    }
                    return "none" === b ? "" : b;
                }),
                (e.prototype.cacheAnimationName = function (a) {
                    return this.animationNameCache.set(
                        a,
                        this.animationName(a)
                    );
                }),
                (e.prototype.cachedAnimationName = function (a) {
                    return this.animationNameCache.get(a);
                }),
                (e.prototype.scrollHandler = function () {
                    return (this.scrolled = !0);
                }),
                (e.prototype.scrollCallback = function () {
                    var a;
                    return !this.scrolled ||
                        ((this.scrolled = !1),
                        (this.boxes = function () {
                            var b, c, d, e;
                            for (
                                d = this.boxes, e = [], b = 0, c = d.length;
                                c > b;
                                b++
                            )
                                (a = d[b]),
                                    a &&
                                        (this.isVisible(a)
                                            ? this.show(a)
                                            : e.push(a));
                            return e;
                        }.call(this)),
                        this.boxes.length || this.config.live)
                        ? void 0
                        : this.stop();
                }),
                (e.prototype.offsetTop = function (a) {
                    for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
                    for (b = a.offsetTop; (a = a.offsetParent); )
                        b += a.offsetTop;
                    return b;
                }),
                (e.prototype.isVisible = function (a) {
                    var b, c, d, e, f;
                    return (
                        (c =
                            a.getAttribute("data-wow-offset") ||
                            this.config.offset),
                        (f =
                            (this.config.scrollContainer &&
                                this.config.scrollContainer.scrollTop) ||
                            window.pageYOffset),
                        (e =
                            f +
                            Math.min(
                                this.element.clientHeight,
                                this.util().innerHeight()
                            ) -
                            c),
                        (d = this.offsetTop(a)),
                        (b = d + a.clientHeight),
                        e >= d && b >= f
                    );
                }),
                (e.prototype.util = function () {
                    return null != this._util
                        ? this._util
                        : (this._util = new b());
                }),
                (e.prototype.disabled = function () {
                    return (
                        !this.config.mobile &&
                        this.util().isMobile(navigator.userAgent)
                    );
                }),
                e
            );
        })());
}).call(this);

/*jquery.mb.YTPlayer 24-12-2017
 _ jquery.mb.components 
 _ email: matteo@open-lab.com 
 _ Copyright (c) 2001-2017. Matteo Bicocchi (Pupunzi); 
 _ blog: http://pupunzi.open-lab.com 
 _ Open Lab s.r.l., Florence - Italy 
 */
function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady ||
        ((ytp.YTAPIReady = !0), jQuery(document).trigger("YTAPIReady"));
}
function uncamel(a) {
    return a.replace(/([A-Z])/g, function (a) {
        return "-" + a.toLowerCase();
    });
}
function setUnit(a, b) {
    return "string" != typeof a || a.match(/^[\-0-9\.]+jQuery/)
        ? "" + a + b
        : a;
}
function setFilter(a, b, c) {
    var d = uncamel(b),
        e = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    (a[e + "filter"] = a[e + "filter"] || ""),
        (c = setUnit(
            c > jQuery.CSS.filters[b].max ? jQuery.CSS.filters[b].max : c,
            jQuery.CSS.filters[b].unit
        )),
        (a[e + "filter"] += d + "(" + c + ") "),
        delete a[b];
}
function isTouchSupported() {
    var a = nAgt.msMaxTouchPoints,
        b = "ontouchstart" in document.createElement("div");
    return a || b ? !0 : !1;
}
function isTouchSupported() {
    var a = nAgt.msMaxTouchPoints,
        b = "ontouchstart" in document.createElement("div");
    return a || b ? !0 : !1;
}
var ytp = ytp || {},
    getYTPVideoID = function (a) {
        var b, c;
        return (
            a.indexOf("youtu.be") > 0
                ? ((b = a.substr(a.lastIndexOf("/") + 1, a.length)),
                  (c =
                      b.indexOf("?list=") > 0
                          ? b.substr(b.lastIndexOf("="), b.length)
                          : null),
                  (b = c ? b.substr(0, b.lastIndexOf("?")) : b))
                : a.indexOf("http") > -1
                ? ((b = a.match(/[\\?&]v=([^&#]*)/)[1]),
                  (c =
                      a.indexOf("list=") > 0
                          ? a.match(/[\\?&]list=([^&#]*)/)[1]
                          : null))
                : ((b = a.length > 15 ? null : a), (c = b ? null : a)),
            { videoID: b, playlistID: c }
        );
    };
!(function (jQuery, ytp) {
    (jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "3.1.5",
        build: "6799",
        author: "Matteo Bicocchi (pupunzi)",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto",
            videoURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            vol: 50,
            addRaster: !1,
            mask: !1,
            opacity: 1,
            quality: "default",
            mute: !1,
            loop: !0,
            fadeOnStartTime: 1500,
            showControls: !0,
            showAnnotations: !1,
            showYTLogo: !0,
            stopMovieOnBlur: !0,
            realfullscreen: !0,
            abundance: 0.2,
            useOnMobile: !0,
            mobileFallbackImage: null,
            gaTrack: !0,
            optimizeDisplay: !0,
            remember_last_time: !1,
            playOnlyIfVisible: !1,
            anchor: "center,center",
            addFilters: null,
            onReady: function (a) {},
            onError: function (a, b) {},
        },
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y",
        },
        controlBar: null,
        locationProtocol: "https:",
        defaultFilters: {
            grayscale: { value: 0, unit: "%" },
            hue_rotate: { value: 0, unit: "deg" },
            invert: { value: 0, unit: "%" },
            opacity: { value: 0, unit: "%" },
            saturate: { value: 0, unit: "%" },
            sepia: { value: 0, unit: "%" },
            brightness: { value: 0, unit: "%" },
            contrast: { value: 0, unit: "%" },
            blur: { value: 0, unit: "px" },
        },
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this,
                    $YTPlayer = jQuery(YTPlayer);
                (YTPlayer.loop = 0),
                    (YTPlayer.opt = {}),
                    (YTPlayer.state = 0),
                    (YTPlayer.filters = $.extend(
                        !0,
                        {},
                        jQuery.mbYTPlayer.defaultFilters
                    )),
                    (YTPlayer.filtersEnabled = !0),
                    (YTPlayer.id =
                        YTPlayer.id || "YTP_" + new Date().getTime()),
                    $YTPlayer.addClass("mb_YTPlayer");
                var property =
                    $YTPlayer.data("property") &&
                    "string" == typeof $YTPlayer.data("property")
                        ? eval("(" + $YTPlayer.data("property") + ")")
                        : $YTPlayer.data("property");
                "undefined" != typeof property &&
                    "undefined" != typeof property.vol &&
                    0 === property.vol &&
                    ((property.vol = 1), (property.mute = !0)),
                    (YTPlayer.opt = jQuery.extend(
                        jQuery.mbYTPlayer.defaults,
                        options,
                        property
                    )),
                    console.debug("1:: ", property),
                    console.debug("1:: ", YTPlayer.opt),
                    "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999),
                    (YTPlayer.isRetina =
                        window.retina || window.devicePixelRatio > 1);
                var isIframe = function () {
                    var a = !1;
                    try {
                        self.location.href != top.location.href && (a = !0);
                    } catch (b) {
                        a = !0;
                    }
                    return a;
                };
                (YTPlayer.opt.realfullscreen = isIframe()
                    ? !1
                    : YTPlayer.opt.realfullscreen),
                    $YTPlayer.attr("id") ||
                        $YTPlayer.attr("id", "ytp_" + new Date().getTime());
                var playerID = "iframe_" + YTPlayer.id;
                (YTPlayer.isAlone = !1),
                    (YTPlayer.hasFocus = !0),
                    (YTPlayer.videoID = this.opt.videoURL
                        ? getYTPVideoID(this.opt.videoURL).videoID
                        : $YTPlayer.attr("href")
                        ? getYTPVideoID($YTPlayer.attr("href")).videoID
                        : !1),
                    (YTPlayer.playlistID = this.opt.videoURL
                        ? getYTPVideoID(this.opt.videoURL).playlistID
                        : $YTPlayer.attr("href")
                        ? getYTPVideoID($YTPlayer.attr("href")).playlistID
                        : !1),
                    (YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations
                        ? "1"
                        : "3");
                var start_from_last = 0;
                if (
                    (jQuery.mbCookie.get(
                        "YTPlayer_start_from" + YTPlayer.videoID
                    ) &&
                        (start_from_last = parseFloat(
                            jQuery.mbCookie.get(
                                "YTPlayer_start_from" + YTPlayer.videoID
                            )
                        )),
                    YTPlayer.opt.remember_last_time &&
                        start_from_last &&
                        ((YTPlayer.start_from_last = start_from_last),
                        jQuery.mbCookie.remove(
                            "YTPlayer_start_from" + YTPlayer.videoID
                        )),
                    jQuery.mbBrowser.msie &&
                        jQuery.mbBrowser.version < 9 &&
                        (this.opt.opacity = 1),
                    (YTPlayer.isPlayer = "self" == YTPlayer.opt.containment),
                    (YTPlayer.opt.containment = jQuery(
                        "self" == YTPlayer.opt.containment
                            ? this
                            : YTPlayer.opt.containment
                    )),
                    (YTPlayer.isBackground =
                        YTPlayer.opt.containment.is("body")),
                    !YTPlayer.isBackground || !ytp.backgroundIsInited)
                ) {
                    YTPlayer.isPlayer || $YTPlayer.hide(),
                        (YTPlayer.overlay = jQuery("<div/>")
                            .css({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                            })
                            .addClass("YTPOverlay")),
                        YTPlayer.isPlayer &&
                            YTPlayer.overlay.on("click", function () {
                                $YTPlayer.YTPTogglePlay();
                            }),
                        (YTPlayer.wrapper = jQuery("<div/>")
                            .addClass("mbYTP_wrapper")
                            .attr("id", "wrapper_" + YTPlayer.id)),
                        YTPlayer.wrapper.css({
                            position: "absolute",
                            zIndex: 0,
                            minWidth: "100%",
                            minHeight: "100%",
                            left: 0,
                            top: 0,
                            overflow: "hidden",
                            opacity: 0,
                        });
                    var playerBox = jQuery("<div/>")
                        .attr("id", playerID)
                        .addClass("playerBox");
                    if (
                        (playerBox.css({
                            position: "absolute",
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            overflow: "hidden",
                            opacity: 1,
                        }),
                        YTPlayer.wrapper.append(playerBox),
                        playerBox.after(YTPlayer.overlay),
                        YTPlayer.isPlayer &&
                            ((YTPlayer.inlineWrapper =
                                jQuery("<div/>").addClass("inline-YTPlayer")),
                            YTPlayer.inlineWrapper.css({
                                position: "relative",
                                maxWidth: YTPlayer.opt.containment.css("width"),
                            }),
                            YTPlayer.opt.containment.css({
                                position: "relative",
                                paddingBottom: "56.25%",
                                overflow: "hidden",
                                height: 0,
                            }),
                            YTPlayer.opt.containment.wrap(
                                YTPlayer.inlineWrapper
                            )),
                        YTPlayer.opt.containment
                            .children()
                            .not("script, style")
                            .each(function () {
                                "static" == jQuery(this).css("position") &&
                                    jQuery(this).css("position", "relative");
                            }),
                        YTPlayer.isBackground
                            ? (jQuery("body").css({ boxSizing: "border-box" }),
                              YTPlayer.wrapper.css({
                                  position: "fixed",
                                  top: 0,
                                  left: 0,
                                  zIndex: 0,
                              }),
                              $YTPlayer.hide())
                            : "static" ==
                                  YTPlayer.opt.containment.css("position") &&
                              YTPlayer.opt.containment.css({
                                  position: "relative",
                              }),
                        YTPlayer.opt.containment.prepend(YTPlayer.wrapper),
                        YTPlayer.isBackground ||
                            YTPlayer.overlay
                                .on("mouseenter", function () {
                                    YTPlayer.controlBar &&
                                        YTPlayer.controlBar.length &&
                                        YTPlayer.controlBar.addClass("visible");
                                })
                                .on("mouseleave", function () {
                                    YTPlayer.controlBar &&
                                        YTPlayer.controlBar.length &&
                                        YTPlayer.controlBar.removeClass(
                                            "visible"
                                        );
                                }),
                        ytp.YTAPIReady)
                    )
                        setTimeout(function () {
                            jQuery(document).trigger("YTAPIReady");
                        }, 100);
                    else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script></script>").attr({
                            src:
                                jQuery.mbYTPlayer.locationProtocol +
                                "//www.youtube.com/iframe_api?v=" +
                                jQuery.mbYTPlayer.version,
                            id: "YTAPI",
                        });
                        jQuery("head").prepend(tag);
                    }
                    if (jQuery.mbBrowser.mobile && !YTPlayer.opt.useOnMobile)
                        return (
                            YTPlayer.opt.mobileFallbackImage &&
                                (YTPlayer.wrapper.css({
                                    backgroundImage:
                                        "url(" +
                                        YTPlayer.opt.mobileFallbackImage +
                                        ")",
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    opacity: 1,
                                }),
                                YTPlayer.wrapper.css({ opacity: 1 })),
                            $YTPlayer
                        );
                    jQuery.mbBrowser.mobile &&
                        YTPlayer.opt.autoPlay &&
                        YTPlayer.opt.useOnMobile &&
                        jQuery("body").one("touchstart", function () {
                            YTPlayer.player.playVideo();
                        }),
                        jQuery(document).on("YTAPIReady", function () {
                            (YTPlayer.isBackground && ytp.backgroundIsInited) ||
                                YTPlayer.isInit ||
                                (YTPlayer.isBackground &&
                                    (ytp.backgroundIsInited = !0),
                                (YTPlayer.opt.autoPlay =
                                    "undefined" == typeof YTPlayer.opt.autoPlay
                                        ? YTPlayer.isBackground
                                            ? !0
                                            : !1
                                        : YTPlayer.opt.autoPlay),
                                (YTPlayer.opt.vol = YTPlayer.opt.vol
                                    ? YTPlayer.opt.vol
                                    : 100),
                                jQuery.mbYTPlayer.getDataFromAPI(YTPlayer),
                                jQuery(YTPlayer).on("YTPChanged", function () {
                                    if (!YTPlayer.isInit) {
                                        YTPlayer.isInit = !0;
                                        var a = {
                                            modestbranding: 1,
                                            autoplay: 0,
                                            controls: 0,
                                            showinfo: 0,
                                            rel: 0,
                                            enablejsapi: 1,
                                            version: 3,
                                            playerapiid: playerID,
                                            origin: "*",
                                            allowfullscreen: !0,
                                            wmode: "transparent",
                                            iv_load_policy:
                                                YTPlayer.opt.showAnnotations,
                                            playsinline: jQuery.browser.mobile
                                                ? 1
                                                : 0,
                                            html5: document.createElement(
                                                "video"
                                            ).canPlayType
                                                ? 1
                                                : 0,
                                        };
                                        new YT.Player(playerID, {
                                            playerVars: a,
                                            events: {
                                                onReady: function (a) {
                                                    (YTPlayer.player =
                                                        a.target),
                                                        YTPlayer.player.loadVideoById(
                                                            {
                                                                videoId:
                                                                    YTPlayer.videoID.toString(),
                                                                startSeconds:
                                                                    YTPlayer.opt
                                                                        .startAt,
                                                                endSeconds:
                                                                    YTPlayer.opt
                                                                        .stopAt,
                                                                suggestedQuality:
                                                                    YTPlayer.opt
                                                                        .quality,
                                                            }
                                                        ),
                                                        YTPlayer.isReady ||
                                                            ((YTPlayer.isReady =
                                                                YTPlayer.isPlayer &&
                                                                !YTPlayer.opt
                                                                    .autoPlay
                                                                    ? !1
                                                                    : !0),
                                                            (YTPlayer.playerEl =
                                                                YTPlayer.player.getIframe()),
                                                            jQuery(
                                                                YTPlayer.playerEl
                                                            ).unselectable(),
                                                            $YTPlayer.optimizeDisplay(),
                                                            jQuery(window)
                                                                .off(
                                                                    "resize.YTP_" +
                                                                        YTPlayer.id
                                                                )
                                                                .on(
                                                                    "resize.YTP_" +
                                                                        YTPlayer.id,
                                                                    function () {
                                                                        $YTPlayer.optimizeDisplay();
                                                                    }
                                                                ),
                                                            YTPlayer.opt
                                                                .remember_last_time &&
                                                                jQuery(
                                                                    window
                                                                ).on(
                                                                    "unload.YTP_" +
                                                                        YTPlayer.id,
                                                                    function () {
                                                                        var a =
                                                                            YTPlayer.player.getCurrentTime();
                                                                        jQuery.mbCookie.set(
                                                                            "YTPlayer_start_from" +
                                                                                YTPlayer.videoID,
                                                                            a,
                                                                            0
                                                                        );
                                                                    }
                                                                ),
                                                            jQuery.mbYTPlayer.checkForState(
                                                                YTPlayer
                                                            ));
                                                },
                                                onStateChange: function (a) {
                                                    if (
                                                        "function" ==
                                                        typeof a.target
                                                            .getPlayerState
                                                    ) {
                                                        var b =
                                                            a.target.getPlayerState();
                                                        if (
                                                            YTPlayer.preventTrigger
                                                        )
                                                            return void (YTPlayer.preventTrigger =
                                                                !1);
                                                        YTPlayer.state = b;
                                                        var c;
                                                        switch (b) {
                                                            case -1:
                                                                c =
                                                                    "YTPUnstarted";
                                                                break;
                                                            case 0:
                                                                c =
                                                                    "YTPRealEnd";
                                                                break;
                                                            case 1:
                                                                (c = "YTPPlay"),
                                                                    YTPlayer
                                                                        .controlBar
                                                                        .length &&
                                                                        YTPlayer.controlBar
                                                                            .find(
                                                                                ".mb_YTPPlaypause"
                                                                            )
                                                                            .html(
                                                                                jQuery
                                                                                    .mbYTPlayer
                                                                                    .controls
                                                                                    .pause
                                                                            );
                                                                break;
                                                            case 2:
                                                                (c =
                                                                    "YTPPause"),
                                                                    YTPlayer
                                                                        .controlBar
                                                                        .length &&
                                                                        YTPlayer.controlBar
                                                                            .find(
                                                                                ".mb_YTPPlaypause"
                                                                            )
                                                                            .html(
                                                                                jQuery
                                                                                    .mbYTPlayer
                                                                                    .controls
                                                                                    .play
                                                                            );
                                                                break;
                                                            case 3:
                                                                YTPlayer.player.setPlaybackQuality(
                                                                    YTPlayer.opt
                                                                        .quality
                                                                ),
                                                                    (c =
                                                                        "YTPBuffering"),
                                                                    YTPlayer
                                                                        .controlBar
                                                                        .length &&
                                                                        YTPlayer.controlBar
                                                                            .find(
                                                                                ".mb_YTPPlaypause"
                                                                            )
                                                                            .html(
                                                                                jQuery
                                                                                    .mbYTPlayer
                                                                                    .controls
                                                                                    .play
                                                                            );
                                                                break;
                                                            case 5:
                                                                c = "YTPCued";
                                                        }
                                                        var d = jQuery.Event(c);
                                                        (d.time =
                                                            YTPlayer.currentTime),
                                                            YTPlayer.preventTrigger ||
                                                                jQuery(
                                                                    YTPlayer
                                                                ).trigger(d);
                                                    }
                                                },
                                                onPlaybackQualityChange:
                                                    function (a) {
                                                        var b =
                                                                a.target.getPlaybackQuality(),
                                                            c =
                                                                jQuery.Event(
                                                                    "YTPQualityChange"
                                                                );
                                                        (c.quality = b),
                                                            jQuery(
                                                                YTPlayer
                                                            ).trigger(c);
                                                    },
                                                onError: function (a) {
                                                    150 == a.data &&
                                                        (console.log(
                                                            "Embedding this video is restricted by Youtube."
                                                        ),
                                                        alert(
                                                            "mb.YTPlayer: Embedding this video (" +
                                                                YTPlayer.videoID +
                                                                ") is restricted by Youtube"
                                                        ),
                                                        YTPlayer.isList &&
                                                            jQuery(
                                                                YTPlayer
                                                            ).YTPPlayNext()),
                                                        2 == a.data &&
                                                            YTPlayer.isList &&
                                                            jQuery(
                                                                YTPlayer
                                                            ).YTPPlayNext(),
                                                        "function" ==
                                                            typeof YTPlayer.opt
                                                                .onError &&
                                                            YTPlayer.opt.onError(
                                                                $YTPlayer,
                                                                a
                                                            );
                                                },
                                            },
                                        });
                                    }
                                }));
                        }),
                        $YTPlayer.off("YTPTime.mask"),
                        jQuery.mbYTPlayer.applyMask(YTPlayer);
                }
            });
        },
        isOnScreen: function (a) {
            var b = a.wrapper,
                c = $(window).scrollTop(),
                d = c + $(window).height(),
                e = b.offset().top,
                f = e + b.height() / 2;
            return d >= f && e >= c;
        },
        getDataFromAPI: function (a) {
            if (
                ((a.videoData = jQuery.mbStorage.get(
                    "YTPlayer_data_" + a.videoID
                )),
                jQuery(a)
                    .off("YTPData.YTPlayer")
                    .on("YTPData.YTPlayer", function () {
                        if (a.hasData && a.isPlayer && !a.opt.autoPlay) {
                            var b =
                                a.videoData.thumb_max ||
                                a.videoData.thumb_high ||
                                a.videoData.thumb_medium;
                            a.opt.containment.css({
                                background:
                                    "rgba(0,0,0,0.5) url(" +
                                    b +
                                    ") center center",
                                backgroundSize: "cover",
                            }),
                                (a.opt.backgroundUrl = b);
                        }
                    }),
                a.videoData)
            )
                setTimeout(function () {
                    (a.opt.ratio =
                        "auto" == a.opt.ratio ? 16 / 9 : a.opt.ratio),
                        (a.dataReceived = !0);
                    var b = jQuery.Event("YTPChanged");
                    (b.time = a.currentTime),
                        (b.videoId = a.videoID),
                        jQuery(a).trigger(b);
                    var c = jQuery.Event("YTPData");
                    c.prop = {};
                    for (var d in a.videoData) c.prop[d] = a.videoData[d];
                    jQuery(a).trigger(c);
                }, a.opt.fadeOnStartTime),
                    (a.hasData = !0);
            else if (jQuery.mbYTPlayer.apiKey)
                jQuery.getJSON(
                    jQuery.mbYTPlayer.locationProtocol +
                        "//www.googleapis.com/youtube/v3/videos?id=" +
                        a.videoID +
                        "&key=" +
                        jQuery.mbYTPlayer.apiKey +
                        "&part=snippet",
                    function (b) {
                        function c(b) {
                            (a.videoData = {}),
                                (a.videoData.id = a.videoID),
                                (a.videoData.channelTitle = b.channelTitle),
                                (a.videoData.title = b.title),
                                (a.videoData.description =
                                    b.description.length < 400
                                        ? b.description
                                        : b.description.substring(0, 400) +
                                          " ..."),
                                (a.videoData.aspectratio =
                                    "auto" == a.opt.ratio
                                        ? 16 / 9
                                        : a.opt.ratio),
                                (a.opt.ratio = a.videoData.aspectratio),
                                (a.videoData.thumb_max = b.thumbnails.maxres
                                    ? b.thumbnails.maxres.url
                                    : null),
                                (a.videoData.thumb_high = b.thumbnails.high
                                    ? b.thumbnails.high.url
                                    : null),
                                (a.videoData.thumb_medium = b.thumbnails.medium
                                    ? b.thumbnails.medium.url
                                    : null),
                                jQuery.mbStorage.set(
                                    "YTPlayer_data_" + a.videoID,
                                    a.videoData
                                );
                        }
                        a.dataReceived = !0;
                        var d = jQuery.Event("YTPChanged");
                        (d.time = a.currentTime),
                            (d.videoId = a.videoID),
                            jQuery(a).trigger(d),
                            b.items[0]
                                ? (c(b.items[0].snippet), (a.hasData = !0))
                                : ((a.videoData = {}), (a.hasData = !1));
                        var e = jQuery.Event("YTPData");
                        e.prop = {};
                        for (var f in a.videoData) e.prop[f] = a.videoData[f];
                        jQuery(a).trigger(e);
                    }
                );
            else {
                if (
                    (setTimeout(function () {
                        var b = jQuery.Event("YTPChanged");
                        (b.time = a.currentTime),
                            (b.videoId = a.videoID),
                            jQuery(a).trigger(b);
                    }, 50),
                    a.isPlayer && !a.opt.autoPlay)
                ) {
                    var b =
                        jQuery.mbYTPlayer.locationProtocol +
                        "//i.ytimg.com/vi/" +
                        a.videoID +
                        "/maxresdefault.jpg";
                    b &&
                        a.opt.containment.css({
                            background:
                                "rgba(0,0,0,0.5) url(" + b + ") center center",
                            backgroundSize: "cover",
                        }),
                        (a.opt.backgroundUrl = b);
                }
                (a.videoData = null),
                    (a.opt.ratio =
                        "auto" == a.opt.ratio ? "16/9" : a.opt.ratio);
            }
            a.isPlayer &&
                !a.opt.autoPlay &&
                ((a.loading = jQuery("<div/>")
                    .addClass("loading")
                    .html("Loading")
                    .hide()),
                jQuery(a).append(a.loading),
                a.loading.fadeIn());
        },
        removeStoredData: function () {
            jQuery.mbStorage.remove();
        },
        getVideoData: function () {
            var a = this.get(0);
            return a.videoData;
        },
        getVideoID: function () {
            var a = this.get(0);
            return a.videoID || !1;
        },
        getPlaylistID: function () {
            var a = this.get(0);
            return a.playlistID || !1;
        },
        setVideoQuality: function (a) {
            var b = this.get(0);
            return b.player.setPlaybackQuality(a), this;
        },
        playlist: function (a, b, c) {
            var d = this,
                e = d.get(0);
            return (
                (e.isList = !0),
                b && (a = jQuery.shuffle(a)),
                e.videoID ||
                    ((e.videos = a),
                    (e.videoCounter = 1),
                    (e.videoLength = a.length),
                    jQuery(e).data("property", a[0]),
                    jQuery(e).mb_YTPlayer()),
                "function" == typeof c &&
                    jQuery(e).one("YTPChanged", function () {
                        c(e);
                    }),
                jQuery(e).on("YTPEnd", function () {
                    jQuery(e).YTPPlayNext();
                }),
                this
            );
        },
        playNext: function () {
            var a = this.get(0);
            return (
                a.videoCounter++,
                a.videoCounter > a.videoLength && (a.videoCounter = 1),
                jQuery(a).YTPPlayIndex(a.videoCounter),
                this
            );
        },
        playPrev: function () {
            var a = this.get(0);
            return (
                a.videoCounter--,
                a.videoCounter <= 0 && (a.videoCounter = a.videoLength),
                jQuery(a).YTPPlayIndex(a.videoCounter),
                this
            );
        },
        playIndex: function (a) {
            var b = this.get(0);
            b.checkForStartAt &&
                (clearInterval(b.checkForStartAt), clearInterval(b.getState)),
                (b.videoCounter = a),
                b.videoCounter >= b.videoLength &&
                    (b.videoCounter = b.videoLength);
            var c = b.videos[b.videoCounter - 1];
            return jQuery(b).YTPChangeVideo(c), this;
        },
        changeVideo: function (a) {
            console.debug("changeVideo", a);
            var b = this,
                c = b.get(0);
            return (
                (c.opt.startAt = 0),
                (c.opt.stopAt = 0),
                (c.opt.mask = !1),
                (c.opt.mute = !0),
                (c.opt.autoPlay = !0),
                (c.opt.addFilters = !1),
                (c.hasData = !1),
                (c.hasChanged = !0),
                (c.player.loopTime = void 0),
                a && jQuery.extend(c.opt, a),
                (c.videoID = getYTPVideoID(c.opt.videoURL).videoID),
                "true" == c.opt.loop && (c.opt.loop = 9999),
                jQuery(c.playerEl).CSSAnimate(
                    { opacity: 0 },
                    c.opt.fadeOnStartTime,
                    function () {
                        var a = jQuery.Event("YTPChangeVideo");
                        (a.time = c.currentTime),
                            jQuery(c).trigger(a),
                            jQuery(c)
                                .YTPGetPlayer()
                                .loadVideoById({
                                    videoId: c.videoID,
                                    startSeconds: c.opt.startAt,
                                    endSeconds: c.opt.stopAt,
                                    suggestedQuality: c.opt.quality,
                                }),
                            jQuery(c).optimizeDisplay(),
                            jQuery.mbYTPlayer.checkForState(c),
                            jQuery.mbYTPlayer.getDataFromAPI(c);
                    }
                ),
                jQuery.mbYTPlayer.applyMask(c),
                this
            );
        },
        getPlayer: function () {
            return jQuery(this).get(0).player;
        },
        playerDestroy: function () {
            var a = this.get(0);
            return (
                (ytp.YTAPIReady = !0),
                (ytp.backgroundIsInited = !1),
                (a.isInit = !1),
                (a.videoID = null),
                (a.isReady = !1),
                a.wrapper.remove(),
                jQuery("#controlBar_" + a.id).remove(),
                clearInterval(a.checkForStartAt),
                clearInterval(a.getState),
                this
            );
        },
        fullscreen: function (real) {
            function hideMouse() {
                YTPlayer.overlay.css({ cursor: "none" });
            }
            function RunPrefixMethod(a, b) {
                for (
                    var c, d, e = ["webkit", "moz", "ms", "o", ""], f = 0;
                    f < e.length && !a[c];

                ) {
                    if (
                        ((c = b),
                        "" == e[f] &&
                            (c = c.substr(0, 1).toLowerCase() + c.substr(1)),
                        (c = e[f] + c),
                        (d = typeof a[c]),
                        "undefined" != d)
                    )
                        return (e = [e[f]]), "function" == d ? a[c]() : a[c];
                    f++;
                }
            }
            function launchFullscreen(a) {
                RunPrefixMethod(a, "RequestFullScreen");
            }
            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") ||
                    RunPrefixMethod(document, "IsFullScreen")) &&
                    RunPrefixMethod(document, "CancelFullScreen");
            }
            var YTPlayer = this.get(0);
            "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen),
                (real = eval(real));
            var controls = jQuery("#controlBar_" + YTPlayer.id),
                fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isPlayer
                    ? YTPlayer.opt.containment
                    : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.mbBrowser.mozilla
                    ? "mozfullscreenchange"
                    : jQuery.mbBrowser.webkit
                    ? "webkitfullscreenchange"
                    : "fullscreenchange";
                jQuery(document)
                    .off(fullscreenchange)
                    .on(fullscreenchange, function () {
                        var a =
                            RunPrefixMethod(document, "IsFullScreen") ||
                            RunPrefixMethod(document, "FullScreen");
                        a
                            ? (jQuery(YTPlayer).YTPSetVideoQuality("default"),
                              jQuery(YTPlayer).trigger("YTPFullScreenStart"))
                            : ((YTPlayer.isAlone = !1),
                              fullScreenBtn.html(
                                  jQuery.mbYTPlayer.controls.onlyYT
                              ),
                              jQuery(YTPlayer).YTPSetVideoQuality(
                                  YTPlayer.opt.quality
                              ),
                              videoWrapper.removeClass("YTPFullscreen"),
                              videoWrapper.CSSAnimate(
                                  { opacity: YTPlayer.opt.opacity },
                                  YTPlayer.opt.fadeOnStartTime
                              ),
                              videoWrapper.css({ zIndex: 0 }),
                              YTPlayer.isBackground
                                  ? jQuery("body").after(controls)
                                  : YTPlayer.wrapper.before(controls),
                              jQuery(window).resize(),
                              jQuery(YTPlayer).trigger("YTPFullScreenEnd"));
                    });
            }
            return (
                YTPlayer.isAlone
                    ? (jQuery(document).off("mousemove.YTPlayer"),
                      clearTimeout(YTPlayer.hideCursor),
                      YTPlayer.overlay.css({ cursor: "auto" }),
                      real
                          ? cancelFullscreen()
                          : (videoWrapper.CSSAnimate(
                                { opacity: YTPlayer.opt.opacity },
                                YTPlayer.opt.fadeOnStartTime
                            ),
                            videoWrapper.css({ zIndex: 0 })),
                      fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT),
                      (YTPlayer.isAlone = !1))
                    : (jQuery(document).on("mousemove.YTPlayer", function (a) {
                          YTPlayer.overlay.css({ cursor: "auto" }),
                              clearTimeout(YTPlayer.hideCursor),
                              jQuery(a.target).parents().is(".mb_YTPBar") ||
                                  (YTPlayer.hideCursor = setTimeout(
                                      hideMouse,
                                      3e3
                                  ));
                      }),
                      hideMouse(),
                      real
                          ? (videoWrapper.css({ opacity: 0 }),
                            videoWrapper.addClass("YTPFullscreen"),
                            launchFullscreen(videoWrapper.get(0)),
                            setTimeout(function () {
                                videoWrapper.CSSAnimate(
                                    { opacity: 1 },
                                    2 * YTPlayer.opt.fadeOnStartTime
                                ),
                                    videoWrapper.append(controls),
                                    jQuery(YTPlayer).optimizeDisplay(),
                                    YTPlayer.player.seekTo(
                                        YTPlayer.player.getCurrentTime() + 0.1,
                                        !0
                                    );
                            }, YTPlayer.opt.fadeOnStartTime))
                          : videoWrapper
                                .css({ zIndex: 1e4 })
                                .CSSAnimate(
                                    { opacity: 1 },
                                    2 * YTPlayer.opt.fadeOnStartTime
                                ),
                      fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite),
                      (YTPlayer.isAlone = !0)),
                this
            );
        },
        toggleLoops: function () {
            var a = this.get(0),
                b = a.opt;
            return (
                1 == b.loop
                    ? (b.loop = 0)
                    : (b.startAt
                          ? a.player.seekTo(b.startAt)
                          : a.player.playVideo(),
                      (b.loop = 1)),
                this
            );
        },
        play: function () {
            var a = this.get(0);
            if (!a.isReady) return this;
            a.player.playVideo(),
                jQuery(a.playerEl).css({ opacity: 1 }),
                a.wrapper.CSSAnimate(
                    { opacity: a.isAlone ? 1 : a.opt.opacity },
                    a.opt.fadeOnStartTime
                );
            var b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPPlaypause");
            return (
                c.html(jQuery.mbYTPlayer.controls.pause),
                (a.state = 1),
                (a.orig_background = jQuery(a).css("background-image")),
                this
            );
        },
        togglePlay: function (a) {
            var b = this.get(0);
            return (
                1 == b.state ? this.YTPPause() : this.YTPPlay(),
                "function" == typeof a && a(b.state),
                this
            );
        },
        stop: function () {
            var a = this.get(0),
                b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPPlaypause");
            return (
                c.html(jQuery.mbYTPlayer.controls.play),
                a.player.stopVideo(),
                this
            );
        },
        pause: function () {
            var a = this.get(0);
            return a.player.pauseVideo(), (a.state = 2), this;
        },
        seekTo: function (a) {
            var b = this.get(0);
            return b.player.seekTo(a, !0), this;
        },
        setVolume: function (a) {
            var b = this.get(0);
            return b.player.length
                ? (a || b.opt.vol || 0 != b.player.getVolume()
                      ? (!a && b.player.getVolume() > 0) ||
                        (a && b.opt.vol == a)
                          ? b.isMute
                              ? jQuery(b).YTPUnmute()
                              : jQuery(b).YTPMute()
                          : ((b.opt.vol = a),
                            b.player.setVolume(b.opt.vol),
                            b.volumeBar &&
                                b.volumeBar.length &&
                                b.volumeBar.updateSliderVal(a))
                      : jQuery(b).YTPUnmute(),
                  this)
                : this;
        },
        toggleVolume: function () {
            var a = this.get(0);
            return a
                ? (a.player.isMuted()
                      ? jQuery(a).YTPUnmute()
                      : jQuery(a).YTPMute(),
                  this)
                : this;
        },
        mute: function () {
            var a = this.get(0);
            if (a.isMute) return this;
            a.player.mute(),
                (a.isMute = !0),
                a.player.setVolume(0),
                a.volumeBar &&
                    a.volumeBar.length &&
                    a.volumeBar.width() > 10 &&
                    a.volumeBar.updateSliderVal(0);
            var b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPMuteUnmute");
            c.html(jQuery.mbYTPlayer.controls.unmute),
                jQuery(a).addClass("isMuted"),
                a.volumeBar &&
                    a.volumeBar.length &&
                    a.volumeBar.addClass("muted");
            var d = jQuery.Event("YTPMuted");
            return (
                (d.time = a.currentTime),
                a.preventTrigger || jQuery(a).trigger(d),
                this
            );
        },
        unmute: function () {
            var a = this.get(0);
            if (!a.isMute) return this;
            a.player.unMute(),
                (a.isMute = !1),
                a.player.setVolume(a.opt.vol),
                a.volumeBar &&
                    a.volumeBar.length &&
                    a.volumeBar.updateSliderVal(
                        a.opt.vol > 10 ? a.opt.vol : 10
                    );
            var b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPMuteUnmute");
            c.html(jQuery.mbYTPlayer.controls.mute),
                jQuery(a).removeClass("isMuted"),
                a.volumeBar &&
                    a.volumeBar.length &&
                    a.volumeBar.removeClass("muted");
            var d = jQuery.Event("YTPUnmuted");
            return (
                (d.time = a.currentTime),
                a.preventTrigger || jQuery(a).trigger(d),
                this
            );
        },
        applyFilter: function (a, b) {
            var c = this,
                d = c.get(0);
            (d.filters[a].value = b), d.filtersEnabled && c.YTPEnableFilters();
        },
        applyFilters: function (a) {
            var b = this,
                c = b.get(0);
            if (!c.isReady)
                return (
                    jQuery(c).on("YTPReady", function () {
                        b.YTPApplyFilters(a);
                    }),
                    this
                );
            for (var d in a) b.YTPApplyFilter(d, a[d]);
            b.trigger("YTPFiltersApplied");
        },
        toggleFilter: function (a, b) {
            var c = this,
                d = c.get(0);
            return (
                d.filters[a].value
                    ? (d.filters[a].value = 0)
                    : (d.filters[a].value = b),
                d.filtersEnabled && jQuery(d).YTPEnableFilters(),
                this
            );
        },
        toggleFilters: function (a) {
            var b = this,
                c = b.get(0);
            return (
                c.filtersEnabled
                    ? (jQuery(c).trigger("YTPDisableFilters"),
                      jQuery(c).YTPDisableFilters())
                    : (jQuery(c).YTPEnableFilters(),
                      jQuery(c).trigger("YTPEnableFilters")),
                "function" == typeof a && a(c.filtersEnabled),
                this
            );
        },
        disableFilters: function () {
            var a = this,
                b = a.get(0),
                c = jQuery(b.playerEl);
            return (
                c.css("-webkit-filter", ""),
                c.css("filter", ""),
                (b.filtersEnabled = !1),
                this
            );
        },
        enableFilters: function () {
            var a = this,
                b = a.get(0),
                c = jQuery(b.playerEl),
                d = "";
            for (var e in b.filters)
                b.filters[e].value &&
                    (d +=
                        e.replace("_", "-") +
                        "(" +
                        b.filters[e].value +
                        b.filters[e].unit +
                        ") ");
            return (
                c.css("-webkit-filter", d),
                c.css("filter", d),
                (b.filtersEnabled = !0),
                this
            );
        },
        removeFilter: function (a, b) {
            var c = this,
                d = c.get(0);
            if (("function" == typeof a && ((b = a), (a = null)), a))
                c.YTPApplyFilter(a, 0), "function" == typeof b && b(a);
            else {
                for (var e in d.filters) c.YTPApplyFilter(e, 0);
                "function" == typeof b && b(e),
                    (d.filters = $.extend(
                        !0,
                        {},
                        jQuery.mbYTPlayer.defaultFilters
                    ));
            }
            var f = jQuery.Event("YTPFiltersApplied");
            return c.trigger(f), this;
        },
        getFilters: function () {
            var a = this.get(0);
            return a.filters;
        },
        addMask: function (a) {
            var b = this.get(0);
            a || (a = b.actualMask);
            var c = jQuery("<img/>")
                .attr("src", a)
                .on("load", function () {
                    b.overlay.CSSAnimate(
                        { opacity: 0 },
                        b.opt.fadeOnStartTime,
                        function () {
                            (b.hasMask = !0),
                                c.remove(),
                                b.overlay.css({
                                    backgroundImage: "url(" + a + ")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover",
                                }),
                                b.overlay.CSSAnimate(
                                    { opacity: 1 },
                                    b.opt.fadeOnStartTime
                                );
                        }
                    );
                });
            return this;
        },
        removeMask: function () {
            var a = this.get(0);
            return (
                a.overlay.CSSAnimate(
                    { opacity: 0 },
                    a.opt.fadeOnStartTime,
                    function () {
                        (a.hasMask = !1),
                            a.overlay.css({
                                backgroundImage: "",
                                backgroundRepeat: "",
                                backgroundPosition: "",
                                backgroundSize: "",
                            }),
                            a.overlay.CSSAnimate(
                                { opacity: 1 },
                                a.opt.fadeOnStartTime
                            );
                    }
                ),
                this
            );
        },
        applyMask: function (a) {
            var b = jQuery(a);
            if ((b.off("YTPTime.mask"), a.opt.mask))
                if ("string" == typeof a.opt.mask)
                    b.YTPAddMask(a.opt.mask), (a.actualMask = a.opt.mask);
                else if ("object" == typeof a.opt.mask) {
                    for (var c in a.opt.mask)
                        if (a.opt.mask[c]) {
                            jQuery("<img/>").attr("src", a.opt.mask[c]);
                        }
                    a.opt.mask[0] && b.YTPAddMask(a.opt.mask[0]),
                        b.on("YTPTime.mask", function (c) {
                            for (var d in a.opt.mask)
                                c.time == d &&
                                    (a.opt.mask[d]
                                        ? (b.YTPAddMask(a.opt.mask[d]),
                                          (a.actualMask = a.opt.mask[d]))
                                        : b.YTPRemoveMask());
                        });
                }
        },
        toggleMask: function () {
            var a = this.get(0),
                b = $(a);
            return a.hasMask ? b.YTPRemoveMask() : b.YTPAddMask(), this;
        },
        manageProgress: function () {
            var a = this.get(0),
                b = jQuery("#controlBar_" + a.id),
                c = b.find(".mb_YTPProgress"),
                d = b.find(".mb_YTPLoaded"),
                e = b.find(".mb_YTPseekbar"),
                f = c.outerWidth(),
                g = Math.floor(a.player.getCurrentTime()),
                h = Math.floor(a.player.getDuration()),
                i = (g * f) / h,
                j = 0,
                k = 100 * a.player.getVideoLoadedFraction();
            return (
                d.css({ left: j, width: k + "%" }),
                e.css({ left: 0, width: i }),
                { totalTime: h, currentTime: g }
            );
        },
        buildControls: function (YTPlayer) {
            var data = YTPlayer.opt;
            if (
                (jQuery("#controlBar_" + YTPlayer.id).remove(),
                YTPlayer.opt.showControls || (YTPlayer.controlBar = !1),
                (data.showYTLogo = data.showYTLogo || data.printUrl),
                !jQuery("#controlBar_" + YTPlayer.id).length)
            ) {
                YTPlayer.controlBar = jQuery("<span/>")
                    .attr("id", "controlBar_" + YTPlayer.id)
                    .addClass("mb_YTPBar")
                    .css({
                        whiteSpace: "noWrap",
                        position: YTPlayer.isBackground ? "fixed" : "absolute",
                        zIndex: YTPlayer.isBackground ? 1e4 : 1e3,
                    })
                    .hide();
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery(
                        "<span>" + jQuery.mbYTPlayer.controls.play + "</span>"
                    )
                        .addClass("mb_YTPPlaypause ytpicon")
                        .click(function () {
                            1 == YTPlayer.player.getPlayerState()
                                ? jQuery(YTPlayer).YTPPause()
                                : jQuery(YTPlayer).YTPPlay();
                        }),
                    MuteUnmute = jQuery(
                        "<span>" + jQuery.mbYTPlayer.controls.mute + "</span>"
                    )
                        .addClass("mb_YTPMuteUnmute ytpicon")
                        .click(function () {
                            0 == YTPlayer.player.getVolume()
                                ? jQuery(YTPlayer).YTPUnmute()
                                : jQuery(YTPlayer).YTPMute();
                        }),
                    volumeBar = jQuery("<div/>")
                        .addClass("mb_YTPVolumeBar")
                        .css({ display: "inline-block" });
                YTPlayer.volumeBar = volumeBar;
                var idx = jQuery("<span/>").addClass("mb_YTPTime"),
                    vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 &&
                    (vURL =
                        jQuery.mbYTPlayer.locationProtocol +
                        "//www.youtube.com/watch?v=" +
                        data.videoURL);
                var movieUrl = jQuery("<span/>")
                        .html(jQuery.mbYTPlayer.controls.ytLogo)
                        .addClass("mb_YTPUrl ytpicon")
                        .attr("title", "view on YouTube")
                        .on("click", function () {
                            window.open(vURL, "viewOnYT");
                        }),
                    onlyVideo = jQuery("<span/>")
                        .html(jQuery.mbYTPlayer.controls.onlyYT)
                        .addClass("mb_OnlyYT ytpicon")
                        .on("click", function () {
                            jQuery(YTPlayer).YTPFullscreen(data.realfullscreen);
                        }),
                    progressBar = jQuery("<div/>")
                        .addClass("mb_YTPProgress")
                        .css("position", "absolute")
                        .click(function (a) {
                            timeBar.css({
                                width: a.clientX - timeBar.offset().left,
                            }),
                                (YTPlayer.timeW =
                                    a.clientX - timeBar.offset().left),
                                YTPlayer.controlBar
                                    .find(".mb_YTPLoaded")
                                    .css({ width: 0 });
                            var b = Math.floor(YTPlayer.player.getDuration());
                            (YTPlayer["goto"] =
                                (timeBar.outerWidth() * b) /
                                progressBar.outerWidth()),
                                YTPlayer.player.seekTo(
                                    parseFloat(YTPlayer["goto"]),
                                    !0
                                ),
                                YTPlayer.controlBar
                                    .find(".mb_YTPLoaded")
                                    .css({ width: 0 });
                        }),
                    loadedBar = jQuery("<div/>")
                        .addClass("mb_YTPLoaded")
                        .css("position", "absolute"),
                    timeBar = jQuery("<div/>")
                        .addClass("mb_YTPseekbar")
                        .css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar),
                    buttonBar
                        .append(playpause)
                        .append(MuteUnmute)
                        .append(volumeBar)
                        .append(idx),
                    data.showYTLogo && buttonBar.append(movieUrl),
                    (YTPlayer.isBackground ||
                        (eval(YTPlayer.opt.realfullscreen) &&
                            !YTPlayer.isBackground)) &&
                        buttonBar.append(onlyVideo),
                    YTPlayer.controlBar.append(buttonBar).append(progressBar),
                    YTPlayer.isBackground
                        ? jQuery("body").after(YTPlayer.controlBar)
                        : (YTPlayer.controlBar.addClass("inlinePlayer"),
                          YTPlayer.wrapper.before(YTPlayer.controlBar)),
                    volumeBar.simpleSlider({
                        initialval: YTPlayer.opt.vol,
                        scale: 100,
                        orientation: "h",
                        callback: function (a) {
                            0 == a.value
                                ? jQuery(YTPlayer).YTPMute()
                                : jQuery(YTPlayer).YTPUnmute(),
                                YTPlayer.player.setVolume(a.value),
                                YTPlayer.isMute || (YTPlayer.opt.vol = a.value);
                        },
                    });
            }
        },
        checkForState: function (YTPlayer) {
            clearInterval(YTPlayer.getState);
            var interval = 10;
            return jQuery.contains(document, YTPlayer)
                ? (jQuery.mbYTPlayer.checkForStart(YTPlayer),
                  void (YTPlayer.getState = setInterval(function () {
                      var prog = jQuery(YTPlayer).YTPManageProgress(),
                          $YTPlayer = jQuery(YTPlayer),
                          data = YTPlayer.opt,
                          startAt = YTPlayer.start_from_last
                              ? YTPlayer.start_from_last
                              : YTPlayer.opt.startAt
                              ? YTPlayer.opt.startAt
                              : 1;
                      YTPlayer.start_from_last = null;
                      var stopAt =
                          YTPlayer.opt.stopAt > YTPlayer.opt.startAt
                              ? YTPlayer.opt.stopAt
                              : 0;
                      if (
                          ((stopAt =
                              stopAt < YTPlayer.player.getDuration()
                                  ? stopAt
                                  : 0),
                          YTPlayer.currentTime != prog.currentTime)
                      ) {
                          var YTPEvent = jQuery.Event("YTPTime");
                          (YTPEvent.time = YTPlayer.currentTime),
                              jQuery(YTPlayer).trigger(YTPEvent);
                      }
                      if (
                          ((YTPlayer.currentTime = prog.currentTime),
                          (YTPlayer.totalTime = YTPlayer.player.getDuration()),
                          0 == YTPlayer.player.getVolume()
                              ? $YTPlayer.addClass("isMuted")
                              : $YTPlayer.removeClass("isMuted"),
                          YTPlayer.opt.showControls &&
                              (prog.totalTime
                                  ? YTPlayer.controlBar
                                        .find(".mb_YTPTime")
                                        .html(
                                            jQuery.mbYTPlayer.formatTime(
                                                prog.currentTime
                                            ) +
                                                " / " +
                                                jQuery.mbYTPlayer.formatTime(
                                                    prog.totalTime
                                                )
                                        )
                                  : YTPlayer.controlBar
                                        .find(".mb_YTPTime")
                                        .html("-- : -- / -- : --")),
                          eval(YTPlayer.opt.stopMovieOnBlur) &&
                              (document.hasFocus()
                                  ? document.hasFocus() &&
                                    !YTPlayer.hasFocus &&
                                    -1 != YTPlayer.state &&
                                    0 != YTPlayer.state &&
                                    ((YTPlayer.hasFocus = !0),
                                    YTPlayer.player.playVideo())
                                  : 1 == YTPlayer.state &&
                                    ((YTPlayer.hasFocus = !1),
                                    $YTPlayer.YTPPause())),
                          YTPlayer.opt.playOnlyIfVisible && 1 == YTPlayer.state)
                      ) {
                          var isOnScreen =
                              jQuery.mbYTPlayer.isOnScreen(YTPlayer);
                          isOnScreen
                              ? YTPlayer.player.playVideo()
                              : $YTPlayer.YTPPause();
                      }
                      if (
                          (YTPlayer.controlBar.length &&
                          YTPlayer.controlBar.outerWidth() <= 400 &&
                          !YTPlayer.isCompact
                              ? (YTPlayer.controlBar.addClass("compact"),
                                (YTPlayer.isCompact = !0),
                                !YTPlayer.isMute &&
                                    YTPlayer.volumeBar &&
                                    YTPlayer.volumeBar.updateSliderVal(
                                        YTPlayer.opt.vol
                                    ))
                              : YTPlayer.controlBar.length &&
                                YTPlayer.controlBar.outerWidth() > 400 &&
                                YTPlayer.isCompact &&
                                (YTPlayer.controlBar.removeClass("compact"),
                                (YTPlayer.isCompact = !1),
                                !YTPlayer.isMute &&
                                    YTPlayer.volumeBar &&
                                    YTPlayer.volumeBar.updateSliderVal(
                                        YTPlayer.opt.vol
                                    )),
                          1 == YTPlayer.player.getPlayerState() &&
                              (parseFloat(YTPlayer.player.getDuration() - 0.5) <
                                  YTPlayer.player.getCurrentTime() ||
                                  (stopAt > 0 &&
                                      parseFloat(
                                          YTPlayer.player.getCurrentTime()
                                      ) > stopAt)))
                      ) {
                          if (YTPlayer.isEnded) return;
                          if (
                              ((YTPlayer.isEnded = !0),
                              setTimeout(function () {
                                  YTPlayer.isEnded = !1;
                              }, 1e3),
                              YTPlayer.isList)
                          ) {
                              if (
                                  !data.loop ||
                                  (data.loop > 0 &&
                                      YTPlayer.player.loopTime ===
                                          data.loop - 1)
                              ) {
                                  (YTPlayer.player.loopTime = void 0),
                                      clearInterval(YTPlayer.getState);
                                  var YTPEnd = jQuery.Event("YTPEnd");
                                  return (
                                      (YTPEnd.time = YTPlayer.currentTime),
                                      void jQuery(YTPlayer).trigger(YTPEnd)
                                  );
                              }
                          } else if (
                              !data.loop ||
                              (data.loop > 0 &&
                                  YTPlayer.player.loopTime === data.loop - 1)
                          )
                              return (
                                  (YTPlayer.player.loopTime = void 0),
                                  (YTPlayer.preventTrigger = !0),
                                  (YTPlayer.state = 2),
                                  jQuery(YTPlayer).YTPPause(),
                                  void YTPlayer.wrapper.CSSAnimate(
                                      { opacity: 0 },
                                      YTPlayer.opt.fadeOnStartTime,
                                      function () {
                                          YTPlayer.controlBar.length &&
                                              YTPlayer.controlBar
                                                  .find(".mb_YTPPlaypause")
                                                  .html(
                                                      jQuery.mbYTPlayer.controls
                                                          .play
                                                  );
                                          var a = jQuery.Event("YTPEnd");
                                          (a.time = YTPlayer.currentTime),
                                              jQuery(YTPlayer).trigger(a),
                                              YTPlayer.player.seekTo(
                                                  startAt,
                                                  !0
                                              ),
                                              YTPlayer.isBackground
                                                  ? YTPlayer.orig_background &&
                                                    jQuery(YTPlayer).css(
                                                        "background-image",
                                                        YTPlayer.orig_background
                                                    )
                                                  : YTPlayer.opt
                                                        .backgroundUrl &&
                                                    YTPlayer.isPlayer &&
                                                    ((YTPlayer.opt.backgroundUrl =
                                                        YTPlayer.opt
                                                            .backgroundUrl ||
                                                        YTPlayer.orig_background),
                                                    YTPlayer.opt.containment.css(
                                                        {
                                                            background:
                                                                "url(" +
                                                                YTPlayer.opt
                                                                    .backgroundUrl +
                                                                ") center center",
                                                            backgroundSize:
                                                                "cover",
                                                        }
                                                    ));
                                      }
                                  )
                              );
                          (YTPlayer.player.loopTime = YTPlayer.player.loopTime
                              ? ++YTPlayer.player.loopTime
                              : 1),
                              (startAt = startAt || 1),
                              (YTPlayer.preventTrigger = !0),
                              (YTPlayer.state = 2),
                              jQuery(YTPlayer).YTPPause(),
                              YTPlayer.player.seekTo(startAt, !0),
                              YTPlayer.player.playVideo();
                      }
                  }, interval)))
                : (jQuery(YTPlayer).YTPPlayerDestroy(),
                  clearInterval(YTPlayer.getState),
                  void clearInterval(YTPlayer.checkForStartAt));
        },
        checkForStart: function (YTPlayer) {
            var $YTPlayer = jQuery(YTPlayer);
            if (!jQuery.contains(document, YTPlayer))
                return void jQuery(YTPlayer).YTPPlayerDestroy();
            if ((jQuery.mbYTPlayer.buildControls(YTPlayer), YTPlayer.overlay))
                if (YTPlayer.opt.addRaster) {
                    var classN =
                        "dot" == YTPlayer.opt.addRaster
                            ? "raster-dot"
                            : "raster";
                    YTPlayer.overlay.addClass(
                        YTPlayer.isRetina ? classN + " retina" : classN
                    );
                } else
                    YTPlayer.overlay.removeClass(function (a, b) {
                        var c = b.split(" "),
                            d = [];
                        return (
                            jQuery.each(c, function (a, b) {
                                /raster.*/.test(b) && d.push(b);
                            }),
                            d.push("retina"),
                            d.join(" ")
                        );
                    });
            (YTPlayer.preventTrigger = !0),
                (YTPlayer.state = 2),
                YTPlayer.player.playVideo(),
                jQuery(YTPlayer).YTPPause(),
                jQuery(YTPlayer).YTPMute();
            var startAt = YTPlayer.start_from_last
                ? YTPlayer.start_from_last
                : YTPlayer.opt.startAt
                ? YTPlayer.opt.startAt
                : 1;
            (YTPlayer.start_from_last = null),
                YTPlayer.player.playVideo(),
                YTPlayer.start_from_last && YTPlayer.player.seekTo(startAt, !0),
                clearInterval(YTPlayer.checkForStartAt),
                jQuery(YTPlayer).YTPMute(),
                (YTPlayer.checkForStartAt = setInterval(function () {
                    var canPlayVideo =
                        YTPlayer.player.getVideoLoadedFraction() >=
                        startAt / YTPlayer.player.getDuration();
                    if (
                        YTPlayer.player.getDuration() > 0 &&
                        YTPlayer.player.getCurrentTime() >= startAt &&
                        canPlayVideo
                    ) {
                        clearInterval(YTPlayer.checkForStartAt),
                            "function" == typeof YTPlayer.opt.onReady &&
                                YTPlayer.opt.onReady(YTPlayer),
                            (YTPlayer.isReady = !0),
                            $YTPlayer.YTPRemoveFilter(),
                            YTPlayer.opt.addFilters
                                ? $YTPlayer.YTPApplyFilters(
                                      YTPlayer.opt.addFilters
                                  )
                                : $YTPlayer.YTPApplyFilters({}),
                            $YTPlayer.YTPEnableFilters();
                        var YTPready = jQuery.Event("YTPReady");
                        if (
                            ((YTPready.time = YTPlayer.currentTime),
                            jQuery(YTPlayer).trigger(YTPready),
                            (YTPlayer.preventTrigger = !0),
                            (YTPlayer.state = 2),
                            jQuery(YTPlayer).YTPPause(),
                            YTPlayer.opt.mute || jQuery(YTPlayer).YTPUnmute(),
                            (YTPlayer.preventTrigger = !1),
                            "undefined" != typeof _gaq &&
                            eval(YTPlayer.opt.gaTrack)
                                ? _gaq.push([
                                      "_trackEvent",
                                      "YTPlayer",
                                      "Play",
                                      YTPlayer.hasData
                                          ? YTPlayer.videoData.title
                                          : YTPlayer.videoID.toString(),
                                  ])
                                : "undefined" != typeof ga &&
                                  eval(YTPlayer.opt.gaTrack) &&
                                  ga(
                                      "send",
                                      "event",
                                      "YTPlayer",
                                      "play",
                                      YTPlayer.hasData
                                          ? YTPlayer.videoData.title
                                          : YTPlayer.videoID.toString()
                                  ),
                            YTPlayer.opt.autoPlay)
                        ) {
                            var YTPStart = jQuery.Event("YTPStart");
                            (YTPStart.time = YTPlayer.currentTime),
                                jQuery(YTPlayer).trigger(YTPStart),
                                $YTPlayer.YTPPlay(),
                                "mac" == jQuery.mbBrowser.os.name &&
                                    jQuery.mbBrowser.safari &&
                                    jQuery.mbBrowser.versionCompare(
                                        jQuery.mbBrowser.fullVersion,
                                        "10.1"
                                    ) < 0 &&
                                    (YTPlayer.safariPlay = setInterval(
                                        function () {
                                            1 != YTPlayer.state
                                                ? $YTPlayer.YTPPlay()
                                                : clearInterval(
                                                      YTPlayer.safariPlay
                                                  );
                                        },
                                        10
                                    ));
                        } else
                            setTimeout(function () {
                                YTPlayer.player.pauseVideo(),
                                    YTPlayer.start_from_last &&
                                        YTPlayer.player.seekTo(startAt, !0),
                                    YTPlayer.isPlayer ||
                                        (jQuery(YTPlayer.playerEl).CSSAnimate(
                                            { opacity: 1 },
                                            YTPlayer.opt.fadeOnStartTime
                                        ),
                                        YTPlayer.wrapper.CSSAnimate(
                                            {
                                                opacity: YTPlayer.isAlone
                                                    ? 1
                                                    : YTPlayer.opt.opacity,
                                            },
                                            YTPlayer.opt.fadeOnStartTime
                                        ));
                            }, 150),
                                YTPlayer.controlBar.length &&
                                    YTPlayer.controlBar
                                        .find(".mb_YTPPlaypause")
                                        .html(jQuery.mbYTPlayer.controls.play);
                        YTPlayer.isPlayer &&
                            !YTPlayer.opt.autoPlay &&
                            YTPlayer.loading &&
                            YTPlayer.loading.length &&
                            (YTPlayer.loading.html("Ready"),
                            setTimeout(function () {
                                YTPlayer.loading.fadeOut();
                            }, 100)),
                            YTPlayer.controlBar &&
                                YTPlayer.controlBar.length &&
                                YTPlayer.controlBar.slideDown(1e3);
                    } else "mac" == jQuery.mbBrowser.os.name && jQuery.mbBrowser.safari && jQuery.mbBrowser.fullVersion && jQuery.mbBrowser.versionCompare(jQuery.mbBrowser.fullVersion, "10.1") < 0 && (YTPlayer.player.playVideo(), startAt >= 0 && YTPlayer.player.seekTo(startAt, !0));
                }, 500));
        },
        getTime: function () {
            var a = this.get(0);
            return jQuery.mbYTPlayer.formatTime(a.currentTime);
        },
        getTotalTime: function (a) {
            var b = this.get(0);
            return jQuery.mbYTPlayer.formatTime(b.totalTime);
        },
        formatTime: function (a) {
            var b = Math.floor(a / 60),
                c = Math.floor(a - 60 * b);
            return (9 >= b ? "0" + b : b) + " : " + (9 >= c ? "0" + c : c);
        },
        setAnchor: function (a) {
            var b = this;
            b.optimizeDisplay(a);
        },
        getAnchor: function () {
            var a = this.get(0);
            return a.opt.anchor;
        },
    }),
        (jQuery.fn.optimizeDisplay = function (anchor) {
            var YTPlayer = this.get(0),
                vid = {};
            (YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor),
                (YTPlayer.opt.anchor =
                    "undefined " != typeof YTPlayer.opt.anchor
                        ? YTPlayer.opt.anchor
                        : "center,center");
            var YTPAlign = YTPlayer.opt.anchor.split(","),
                el = YTPlayer.wrapper,
                iframe = jQuery(YTPlayer.playerEl);
            if (YTPlayer.opt.optimizeDisplay) {
                var abundance = iframe.height() * YTPlayer.opt.abundance,
                    win = {};
                (win.width = el.outerWidth()),
                    (win.height = el.outerHeight() + abundance),
                    (YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio)),
                    (vid.width = win.width),
                    (vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio)),
                    (vid.marginTop = Math.ceil(
                        -((vid.height - win.height) / 2)
                    )),
                    (vid.marginLeft = 0);
                var lowest = vid.height < win.height;
                lowest &&
                    ((vid.height = win.height),
                    (vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio)),
                    (vid.marginTop = 0),
                    (vid.marginLeft = Math.ceil(
                        -((vid.width - win.width) / 2)
                    )));
                for (var a in YTPAlign)
                    if (YTPAlign.hasOwnProperty(a)) {
                        var al = YTPAlign[a].replace(/ /g, "");
                        switch (al) {
                            case "top":
                                vid.marginTop = lowest
                                    ? -((vid.height - win.height) / 2)
                                    : 0;
                                break;
                            case "bottom":
                                vid.marginTop = lowest
                                    ? 0
                                    : -(vid.height - win.height);
                                break;
                            case "left":
                                vid.marginLeft = 0;
                                break;
                            case "right":
                                vid.marginLeft = lowest
                                    ? -(vid.width - win.width)
                                    : 0;
                                break;
                            default:
                                vid.width > win.width &&
                                    (vid.marginLeft = -(
                                        (vid.width - win.width) /
                                        2
                                    ));
                        }
                    }
            } else
                (vid.width = "100%"),
                    (vid.height = "100%"),
                    (vid.marginTop = 0),
                    (vid.marginLeft = 0);
            iframe.css({
                width: vid.width,
                height: vid.height,
                marginTop: vid.marginTop,
                marginLeft: vid.marginLeft,
                maxWidth: "initial",
            });
        }),
        (jQuery.shuffle = function (a) {
            for (var b = a.slice(), c = b.length, d = c; d--; ) {
                var e = parseInt(Math.random() * c),
                    f = b[d];
                (b[d] = b[e]), (b[e] = f);
            }
            return b;
        }),
        (jQuery.fn.unselectable = function () {
            return this.each(function () {
                jQuery(this)
                    .css({
                        "-moz-user-select": "none",
                        "-webkit-user-select": "none",
                        "user-select": "none",
                    })
                    .attr("unselectable", "on");
            });
        }),
        (jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer),
        (jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer),
        (jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID),
        (jQuery.fn.YTPGetPlaylistID = jQuery.mbYTPlayer.getPlaylistID),
        (jQuery.fn.YTPChangeVideo = jQuery.fn.YTPChangeMovie =
            jQuery.mbYTPlayer.changeVideo),
        (jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy),
        (jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play),
        (jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay),
        (jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop),
        (jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause),
        (jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo),
        (jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist),
        (jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext),
        (jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev),
        (jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex),
        (jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute),
        (jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute),
        (jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume),
        (jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume),
        (jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData),
        (jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen),
        (jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops),
        (jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality),
        (jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress),
        (jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter),
        (jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters),
        (jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter),
        (jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters),
        (jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter),
        (jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters),
        (jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters),
        (jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters),
        (jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime),
        (jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime),
        (jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask),
        (jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask),
        (jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask),
        (jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor),
        (jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor);
})(jQuery, ytp),
    (jQuery.support.CSStransition = (function () {
        var a = (document.body || document.documentElement).style;
        return (
            void 0 !== a.transition ||
            void 0 !== a.WebkitTransition ||
            void 0 !== a.MozTransition ||
            void 0 !== a.MsTransition ||
            void 0 !== a.OTransition
        );
    })()),
    (jQuery.CSS = {
        name: "mb.CSSAnimate",
        author: "Matteo Bicocchi",
        version: "2.0.0",
        transitionEnd: "transitionEnd",
        sfx: "",
        filters: {
            blur: { min: 0, max: 100, unit: "px" },
            brightness: { min: 0, max: 400, unit: "%" },
            contrast: { min: 0, max: 400, unit: "%" },
            grayscale: { min: 0, max: 100, unit: "%" },
            hueRotate: { min: 0, max: 360, unit: "deg" },
            invert: { min: 0, max: 100, unit: "%" },
            saturate: { min: 0, max: 400, unit: "%" },
            sepia: { min: 0, max: 100, unit: "%" },
        },
        normalizeCss: function (a) {
            var b = jQuery.extend(!0, {}, a);
            jQuery.browser.webkit || jQuery.browser.opera
                ? (jQuery.CSS.sfx = "-webkit-")
                : jQuery.browser.mozilla
                ? (jQuery.CSS.sfx = "-moz-")
                : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-"),
                (jQuery.CSS.sfx = "");
            for (var c in b) {
                if (
                    ("transform" === c &&
                        ((b[jQuery.CSS.sfx + "transform"] = b[c]), delete b[c]),
                    "transform-origin" === c &&
                        ((b[jQuery.CSS.sfx + "transform-origin"] = a[c]),
                        delete b[c]),
                    "filter" !== c ||
                        jQuery.browser.mozilla ||
                        ((b[jQuery.CSS.sfx + "filter"] = a[c]), delete b[c]),
                    "blur" === c && setFilter(b, "blur", a[c]),
                    "brightness" === c && setFilter(b, "brightness", a[c]),
                    "contrast" === c && setFilter(b, "contrast", a[c]),
                    "grayscale" === c && setFilter(b, "grayscale", a[c]),
                    "hueRotate" === c && setFilter(b, "hueRotate", a[c]),
                    "invert" === c && setFilter(b, "invert", a[c]),
                    "saturate" === c && setFilter(b, "saturate", a[c]),
                    "sepia" === c && setFilter(b, "sepia", a[c]),
                    "x" === c)
                ) {
                    var d = jQuery.CSS.sfx + "transform";
                    (b[d] = b[d] || ""),
                        (b[d] += " translateX(" + setUnit(a[c], "px") + ")"),
                        delete b[c];
                }
                "y" === c &&
                    ((d = jQuery.CSS.sfx + "transform"),
                    (b[d] = b[d] || ""),
                    (b[d] += " translateY(" + setUnit(a[c], "px") + ")"),
                    delete b[c]),
                    "z" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " translateZ(" + setUnit(a[c], "px") + ")"),
                        delete b[c]),
                    "rotate" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " rotate(" + setUnit(a[c], "deg") + ")"),
                        delete b[c]),
                    "rotateX" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " rotateX(" + setUnit(a[c], "deg") + ")"),
                        delete b[c]),
                    "rotateY" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " rotateY(" + setUnit(a[c], "deg") + ")"),
                        delete b[c]),
                    "rotateZ" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " rotateZ(" + setUnit(a[c], "deg") + ")"),
                        delete b[c]),
                    "scale" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " scale(" + setUnit(a[c], "") + ")"),
                        delete b[c]),
                    "scaleX" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " scaleX(" + setUnit(a[c], "") + ")"),
                        delete b[c]),
                    "scaleY" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " scaleY(" + setUnit(a[c], "") + ")"),
                        delete b[c]),
                    "scaleZ" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " scaleZ(" + setUnit(a[c], "") + ")"),
                        delete b[c]),
                    "skew" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " skew(" + setUnit(a[c], "deg") + ")"),
                        delete b[c]),
                    "skewX" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " skewX(" + setUnit(a[c], "deg") + ")"),
                        delete b[c]),
                    "skewY" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " skewY(" + setUnit(a[c], "deg") + ")"),
                        delete b[c]),
                    "perspective" === c &&
                        ((d = jQuery.CSS.sfx + "transform"),
                        (b[d] = b[d] || ""),
                        (b[d] += " perspective(" + setUnit(a[c], "px") + ")"),
                        delete b[c]);
            }
            return b;
        },
        getProp: function (a) {
            var b,
                c = [];
            for (b in a) 0 > c.indexOf(b) && c.push(uncamel(b));
            return c.join(",");
        },
        animate: function (a, b, c, d, e) {
            return this.each(function () {
                function f() {
                    (g.called = !0),
                        (g.CSSAIsRunning = !1),
                        h.off(jQuery.CSS.transitionEnd + "." + g.id),
                        clearTimeout(g.timeout),
                        h.css(jQuery.CSS.sfx + "transition", ""),
                        "function" == typeof e && e.apply(g),
                        "function" == typeof g.CSSqueue &&
                            (g.CSSqueue(), (g.CSSqueue = null));
                }
                var g = this,
                    h = jQuery(this);
                g.id = g.id || "CSSA_" + new Date().getTime();
                var i = i || { type: "noEvent" };
                if (
                    g.CSSAIsRunning &&
                    g.eventType == i.type &&
                    !jQuery.browser.msie &&
                    9 >= jQuery.browser.version
                )
                    g.CSSqueue = function () {
                        h.CSSAnimate(a, b, c, d, e);
                    };
                else if (
                    ((g.CSSqueue = null),
                    (g.eventType = i.type),
                    0 !== h.length && a)
                ) {
                    if (
                        ((a = jQuery.normalizeCss(a)),
                        (g.CSSAIsRunning = !0),
                        "function" == typeof b &&
                            ((e = b), (b = jQuery.fx.speeds._default)),
                        "function" == typeof c && ((d = c), (c = 0)),
                        "string" == typeof c && ((e = c), (c = 0)),
                        "function" == typeof d &&
                            ((e = d),
                            (d = "cubic-bezier(0.65,0.03,0.36,0.72)")),
                        "string" == typeof b)
                    )
                        for (var j in jQuery.fx.speeds) {
                            if (b == j) {
                                b = jQuery.fx.speeds[j];
                                break;
                            }
                            b = jQuery.fx.speeds._default;
                        }
                    if (
                        (b || (b = jQuery.fx.speeds._default),
                        "string" == typeof e && ((d = e), (e = null)),
                        jQuery.support.CSStransition)
                    ) {
                        var k = {
                            default: "ease",
                            in: "ease-in",
                            out: "ease-out",
                            "in-out": "ease-in-out",
                            snap: "cubic-bezier(0,1,.5,1)",
                            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                            easeInOutExpo: "cubic-bezier(1,0,0,1)",
                            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                            easeInSine: "cubic-bezier(.47,0,.745,.715)",
                            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)",
                        };
                        k[d] && (d = k[d]),
                            h.off(jQuery.CSS.transitionEnd + "." + g.id),
                            (k = jQuery.CSS.getProp(a));
                        var l = {};
                        jQuery.extend(l, a),
                            (l[jQuery.CSS.sfx + "transition-property"] = k),
                            (l[jQuery.CSS.sfx + "transition-duration"] =
                                b + "ms"),
                            (l[jQuery.CSS.sfx + "transition-delay"] = c + "ms"),
                            (l[jQuery.CSS.sfx + "transition-timing-function"] =
                                d),
                            setTimeout(function () {
                                h.one(jQuery.CSS.transitionEnd + "." + g.id, f),
                                    h.css(l);
                            }, 1),
                            (g.timeout = setTimeout(function () {
                                g.called || !e
                                    ? ((g.called = !1), (g.CSSAIsRunning = !1))
                                    : (h.css(jQuery.CSS.sfx + "transition", ""),
                                      e.apply(g),
                                      (g.CSSAIsRunning = !1),
                                      "function" == typeof g.CSSqueue &&
                                          (g.CSSqueue(), (g.CSSqueue = null)));
                            }, b + c + 10));
                    } else {
                        for (k in a)
                            "transform" === k && delete a[k],
                                "filter" === k && delete a[k],
                                "transform-origin" === k && delete a[k],
                                "auto" === a[k] && delete a[k],
                                "x" === k &&
                                    ((i = a[k]),
                                    (j = "left"),
                                    (a[j] = i),
                                    delete a[k]),
                                "y" === k &&
                                    ((i = a[k]),
                                    (j = "top"),
                                    (a[j] = i),
                                    delete a[k]),
                                ("-ms-transform" !== k && "-ms-filter" !== k) ||
                                    delete a[k];
                        h.delay(c).animate(a, b, e);
                    }
                }
            });
        },
    }),
    (jQuery.fn.CSSAnimate = jQuery.CSS.animate),
    (jQuery.normalizeCss = jQuery.CSS.normalizeCss),
    (jQuery.fn.css3 = function (a) {
        return this.each(function () {
            var b = jQuery(this),
                c = jQuery.normalizeCss(a);
            b.css(c);
        });
    });
var nAgt = navigator.userAgent;
(jQuery.browser = jQuery.browser || {}),
    (jQuery.browser.mozilla = !1),
    (jQuery.browser.webkit = !1),
    (jQuery.browser.opera = !1),
    (jQuery.browser.safari = !1),
    (jQuery.browser.chrome = !1),
    (jQuery.browser.androidStock = !1),
    (jQuery.browser.msie = !1),
    (jQuery.browser.edge = !1),
    (jQuery.browser.ua = nAgt);
var getOS = function () {
    var a = { version: "Unknown version", name: "Unknown OS" };
    return (
        -1 != navigator.appVersion.indexOf("Win") && (a.name = "Windows"),
        -1 != navigator.appVersion.indexOf("Mac") &&
            0 > navigator.appVersion.indexOf("Mobile") &&
            (a.name = "Mac"),
        -1 != navigator.appVersion.indexOf("Linux") && (a.name = "Linux"),
        /Mac OS X/.test(nAgt) &&
            !/Mobile/.test(nAgt) &&
            ((a.version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1]),
            (a.version = a.version.replace(/_/g, ".").substring(0, 5))),
        /Windows/.test(nAgt) && (a.version = "Unknown.Unknown"),
        /Windows NT 5.1/.test(nAgt) && (a.version = "5.1"),
        /Windows NT 6.0/.test(nAgt) && (a.version = "6.0"),
        /Windows NT 6.1/.test(nAgt) && (a.version = "6.1"),
        /Windows NT 6.2/.test(nAgt) && (a.version = "6.2"),
        /Windows NT 10.0/.test(nAgt) && (a.version = "10.0"),
        /Linux/.test(nAgt) &&
            /Linux/.test(nAgt) &&
            (a.version = "Unknown.Unknown"),
        (a.name = a.name.toLowerCase()),
        (a.major_version = "Unknown"),
        (a.minor_version = "Unknown"),
        "Unknown.Unknown" != a.version &&
            ((a.major_version = parseFloat(a.version.split(".")[0])),
            (a.minor_version = parseFloat(a.version.split(".")[1]))),
        a
    );
};
(jQuery.browser.os = getOS()),
    (jQuery.browser.hasTouch = isTouchSupported()),
    (jQuery.browser.name = navigator.appName),
    (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion)),
    (jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10));
var nameOffset, verOffset, ix;
if (-1 != (verOffset = nAgt.indexOf("Opera")))
    (jQuery.browser.opera = !0),
        (jQuery.browser.name = "Opera"),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 6)),
        -1 != (verOffset = nAgt.indexOf("Version")) &&
            (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
else if (-1 != (verOffset = nAgt.indexOf("OPR")))
    (jQuery.browser.opera = !0),
        (jQuery.browser.name = "Opera"),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 4));
else if (-1 != (verOffset = nAgt.indexOf("MSIE")))
    (jQuery.browser.msie = !0),
        (jQuery.browser.name = "Microsoft Internet Explorer"),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 5));
else if (-1 != nAgt.indexOf("Trident")) {
    (jQuery.browser.msie = !0),
        (jQuery.browser.name = "Microsoft Internet Explorer");
    var start = nAgt.indexOf("rv:") + 3,
        end = start + 4;
    jQuery.browser.fullVersion = nAgt.substring(start, end);
} else
    -1 != (verOffset = nAgt.indexOf("Edge"))
        ? ((jQuery.browser.edge = !0),
          (jQuery.browser.name = "Microsoft Edge"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 5)))
        : -1 != (verOffset = nAgt.indexOf("Chrome"))
        ? ((jQuery.browser.webkit = !0),
          (jQuery.browser.chrome = !0),
          (jQuery.browser.name = "Chrome"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)))
        : -1 < nAgt.indexOf("mozilla/5.0") &&
          -1 < nAgt.indexOf("android ") &&
          -1 < nAgt.indexOf("applewebkit") &&
          !(-1 < nAgt.indexOf("chrome"))
        ? ((verOffset = nAgt.indexOf("Chrome")),
          (jQuery.browser.webkit = !0),
          (jQuery.browser.androidStock = !0),
          (jQuery.browser.name = "androidStock"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)))
        : -1 != (verOffset = nAgt.indexOf("Safari"))
        ? ((jQuery.browser.webkit = !0),
          (jQuery.browser.safari = !0),
          (jQuery.browser.name = "Safari"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)),
          -1 != (verOffset = nAgt.indexOf("Version")) &&
              (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
        : -1 != (verOffset = nAgt.indexOf("AppleWebkit"))
        ? ((jQuery.browser.webkit = !0),
          (jQuery.browser.safari = !0),
          (jQuery.browser.name = "Safari"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)),
          -1 != (verOffset = nAgt.indexOf("Version")) &&
              (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
        : -1 != (verOffset = nAgt.indexOf("Firefox"))
        ? ((jQuery.browser.mozilla = !0),
          (jQuery.browser.name = "Firefox"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
        : (nameOffset = nAgt.lastIndexOf(" ") + 1) <
              (verOffset = nAgt.lastIndexOf("/")) &&
          ((jQuery.browser.name = nAgt.substring(nameOffset, verOffset)),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 1)),
          jQuery.browser.name.toLowerCase() ==
              jQuery.browser.name.toUpperCase() &&
              (jQuery.browser.name = navigator.appName));
-1 != (ix = jQuery.browser.fullVersion.indexOf(";")) &&
    (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)),
    -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) &&
        (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(
            0,
            ix
        )),
    (jQuery.browser.majorVersion = parseInt(
        "" + jQuery.browser.fullVersion,
        10
    )),
    isNaN(jQuery.browser.majorVersion) &&
        ((jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion)),
        (jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10))),
    (jQuery.browser.version = jQuery.browser.majorVersion),
    (jQuery.browser.android = /Android/i.test(nAgt)),
    (jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt)),
    (jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt)),
    (jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt)),
    (jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt)),
    (jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt)),
    (jQuery.browser.mobile =
        jQuery.browser.android ||
        jQuery.browser.blackberry ||
        jQuery.browser.ios ||
        jQuery.browser.windowsMobile ||
        jQuery.browser.operaMobile ||
        jQuery.browser.kindle),
    (jQuery.isMobile = jQuery.browser.mobile),
    (jQuery.isTablet = jQuery.browser.mobile && 765 < jQuery(window).width()),
    (jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt)),
    (jQuery.mbBrowser = jQuery.browser),
    (jQuery.browser.versionCompare = function (a, b) {
        if ("stringstring" != typeof a + typeof b) return !1;
        for (
            var c = a.split("."),
                d = b.split("."),
                e = 0,
                f = Math.max(c.length, d.length);
            f > e;
            e++
        ) {
            if (
                (c[e] && !d[e] && 0 < parseInt(c[e])) ||
                parseInt(c[e]) > parseInt(d[e])
            )
                return 1;
            if (
                (d[e] && !c[e] && 0 < parseInt(d[e])) ||
                parseInt(c[e]) < parseInt(d[e])
            )
                return -1;
        }
        return 0;
    });
var nAgt = navigator.userAgent;
(jQuery.browser = jQuery.browser || {}),
    (jQuery.browser.mozilla = !1),
    (jQuery.browser.webkit = !1),
    (jQuery.browser.opera = !1),
    (jQuery.browser.safari = !1),
    (jQuery.browser.chrome = !1),
    (jQuery.browser.androidStock = !1),
    (jQuery.browser.msie = !1),
    (jQuery.browser.edge = !1),
    (jQuery.browser.ua = nAgt);
var getOS = function () {
    var a = { version: "Unknown version", name: "Unknown OS" };
    return (
        -1 != navigator.appVersion.indexOf("Win") && (a.name = "Windows"),
        -1 != navigator.appVersion.indexOf("Mac") &&
            0 > navigator.appVersion.indexOf("Mobile") &&
            (a.name = "Mac"),
        -1 != navigator.appVersion.indexOf("Linux") && (a.name = "Linux"),
        /Mac OS X/.test(nAgt) &&
            !/Mobile/.test(nAgt) &&
            ((a.version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1]),
            (a.version = a.version.replace(/_/g, ".").substring(0, 5))),
        /Windows/.test(nAgt) && (a.version = "Unknown.Unknown"),
        /Windows NT 5.1/.test(nAgt) && (a.version = "5.1"),
        /Windows NT 6.0/.test(nAgt) && (a.version = "6.0"),
        /Windows NT 6.1/.test(nAgt) && (a.version = "6.1"),
        /Windows NT 6.2/.test(nAgt) && (a.version = "6.2"),
        /Windows NT 10.0/.test(nAgt) && (a.version = "10.0"),
        /Linux/.test(nAgt) &&
            /Linux/.test(nAgt) &&
            (a.version = "Unknown.Unknown"),
        (a.name = a.name.toLowerCase()),
        (a.major_version = "Unknown"),
        (a.minor_version = "Unknown"),
        "Unknown.Unknown" != a.version &&
            ((a.major_version = parseFloat(a.version.split(".")[0])),
            (a.minor_version = parseFloat(a.version.split(".")[1]))),
        a
    );
};
(jQuery.browser.os = getOS()),
    (jQuery.browser.hasTouch = isTouchSupported()),
    (jQuery.browser.name = navigator.appName),
    (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion)),
    (jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10));
var nameOffset, verOffset, ix;
if (-1 != (verOffset = nAgt.indexOf("Opera")))
    (jQuery.browser.opera = !0),
        (jQuery.browser.name = "Opera"),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 6)),
        -1 != (verOffset = nAgt.indexOf("Version")) &&
            (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
else if (-1 != (verOffset = nAgt.indexOf("OPR")))
    (jQuery.browser.opera = !0),
        (jQuery.browser.name = "Opera"),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 4));
else if (-1 != (verOffset = nAgt.indexOf("MSIE")))
    (jQuery.browser.msie = !0),
        (jQuery.browser.name = "Microsoft Internet Explorer"),
        (jQuery.browser.fullVersion = nAgt.substring(verOffset + 5));
else if (-1 != nAgt.indexOf("Trident")) {
    (jQuery.browser.msie = !0),
        (jQuery.browser.name = "Microsoft Internet Explorer");
    var start = nAgt.indexOf("rv:") + 3,
        end = start + 4;
    jQuery.browser.fullVersion = nAgt.substring(start, end);
} else
    -1 != (verOffset = nAgt.indexOf("Edge"))
        ? ((jQuery.browser.edge = !0),
          (jQuery.browser.name = "Microsoft Edge"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 5)))
        : -1 != (verOffset = nAgt.indexOf("Chrome"))
        ? ((jQuery.browser.webkit = !0),
          (jQuery.browser.chrome = !0),
          (jQuery.browser.name = "Chrome"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)))
        : -1 < nAgt.indexOf("mozilla/5.0") &&
          -1 < nAgt.indexOf("android ") &&
          -1 < nAgt.indexOf("applewebkit") &&
          !(-1 < nAgt.indexOf("chrome"))
        ? ((verOffset = nAgt.indexOf("Chrome")),
          (jQuery.browser.webkit = !0),
          (jQuery.browser.androidStock = !0),
          (jQuery.browser.name = "androidStock"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)))
        : -1 != (verOffset = nAgt.indexOf("Safari"))
        ? ((jQuery.browser.webkit = !0),
          (jQuery.browser.safari = !0),
          (jQuery.browser.name = "Safari"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)),
          -1 != (verOffset = nAgt.indexOf("Version")) &&
              (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
        : -1 != (verOffset = nAgt.indexOf("AppleWebkit"))
        ? ((jQuery.browser.webkit = !0),
          (jQuery.browser.safari = !0),
          (jQuery.browser.name = "Safari"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)),
          -1 != (verOffset = nAgt.indexOf("Version")) &&
              (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
        : -1 != (verOffset = nAgt.indexOf("Firefox"))
        ? ((jQuery.browser.mozilla = !0),
          (jQuery.browser.name = "Firefox"),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)))
        : (nameOffset = nAgt.lastIndexOf(" ") + 1) <
              (verOffset = nAgt.lastIndexOf("/")) &&
          ((jQuery.browser.name = nAgt.substring(nameOffset, verOffset)),
          (jQuery.browser.fullVersion = nAgt.substring(verOffset + 1)),
          jQuery.browser.name.toLowerCase() ==
              jQuery.browser.name.toUpperCase() &&
              (jQuery.browser.name = navigator.appName));
-1 != (ix = jQuery.browser.fullVersion.indexOf(";")) &&
    (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)),
    -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) &&
        (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(
            0,
            ix
        )),
    (jQuery.browser.majorVersion = parseInt(
        "" + jQuery.browser.fullVersion,
        10
    )),
    isNaN(jQuery.browser.majorVersion) &&
        ((jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion)),
        (jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10))),
    (jQuery.browser.version = jQuery.browser.majorVersion),
    (jQuery.browser.android = /Android/i.test(nAgt)),
    (jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt)),
    (jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt)),
    (jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt)),
    (jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt)),
    (jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt)),
    (jQuery.browser.mobile =
        jQuery.browser.android ||
        jQuery.browser.blackberry ||
        jQuery.browser.ios ||
        jQuery.browser.windowsMobile ||
        jQuery.browser.operaMobile ||
        jQuery.browser.kindle),
    (jQuery.isMobile = jQuery.browser.mobile),
    (jQuery.isTablet = jQuery.browser.mobile && 765 < jQuery(window).width()),
    (jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt)),
    (jQuery.mbBrowser = jQuery.browser),
    (jQuery.browser.versionCompare = function (a, b) {
        if ("stringstring" != typeof a + typeof b) return !1;
        for (
            var c = a.split("."),
                d = b.split("."),
                e = 0,
                f = Math.max(c.length, d.length);
            f > e;
            e++
        ) {
            if (
                (c[e] && !d[e] && 0 < parseInt(c[e])) ||
                parseInt(c[e]) > parseInt(d[e])
            )
                return 1;
            if (
                (d[e] && !c[e] && 0 < parseInt(d[e])) ||
                parseInt(c[e]) < parseInt(d[e])
            )
                return -1;
        }
        return 0;
    }),
    (function (a) {
        (a.simpleSlider = {
            defaults: {
                initialval: 0,
                scale: 100,
                orientation: "h",
                readonly: !1,
                callback: !1,
            },
            events: {
                start: a.browser.mobile ? "touchstart" : "mousedown",
                end: a.browser.mobile ? "touchend" : "mouseup",
                move: a.browser.mobile ? "touchmove" : "mousemove",
            },
            init: function (b) {
                return this.each(function () {
                    var c = this,
                        d = a(c);
                    d.addClass("simpleSlider"),
                        (c.opt = {}),
                        a.extend(c.opt, a.simpleSlider.defaults, b),
                        a.extend(c.opt, d.data());
                    var e =
                        "h" == c.opt.orientation ? "horizontal" : "vertical";
                    (e = a("<div/>").addClass("level").addClass(e)),
                        d.prepend(e),
                        (c.level = e),
                        d.css({ cursor: "default" }),
                        "auto" == c.opt.scale &&
                            (c.opt.scale = a(c).outerWidth()),
                        d.updateSliderVal(),
                        c.opt.readonly ||
                            (d.on(a.simpleSlider.events.start, function (b) {
                                a.browser.mobile && (b = b.changedTouches[0]),
                                    (c.canSlide = !0),
                                    d.updateSliderVal(b),
                                    "h" == c.opt.orientation
                                        ? d.css({ cursor: "col-resize" })
                                        : d.css({ cursor: "row-resize" }),
                                    a.browser.mobile ||
                                        (b.preventDefault(),
                                        b.stopPropagation());
                            }),
                            a(document)
                                .on(a.simpleSlider.events.move, function (b) {
                                    a.browser.mobile &&
                                        (b = b.changedTouches[0]),
                                        c.canSlide &&
                                            (a(document).css({
                                                cursor: "default",
                                            }),
                                            d.updateSliderVal(b),
                                            a.browser.mobile ||
                                                (b.preventDefault(),
                                                b.stopPropagation()));
                                })
                                .on(a.simpleSlider.events.end, function () {
                                    a(document).css({ cursor: "auto" }),
                                        (c.canSlide = !1),
                                        d.css({ cursor: "auto" });
                                }));
                });
            },
            updateSliderVal: function (b) {
                var c = this.get(0);
                if (c.opt) {
                    c.opt.initialval =
                        "number" == typeof c.opt.initialval
                            ? c.opt.initialval
                            : c.opt.initialval(c);
                    var d = a(c).outerWidth(),
                        e = a(c).outerHeight();
                    (c.x =
                        "object" == typeof b
                            ? b.clientX +
                              document.body.scrollLeft -
                              this.offset().left
                            : "number" == typeof b
                            ? (b * d) / c.opt.scale
                            : (c.opt.initialval * d) / c.opt.scale),
                        (c.y =
                            "object" == typeof b
                                ? b.clientY +
                                  document.body.scrollTop -
                                  this.offset().top
                                : "number" == typeof b
                                ? ((c.opt.scale - c.opt.initialval - b) * e) /
                                  c.opt.scale
                                : (c.opt.initialval * e) / c.opt.scale),
                        (c.y = this.outerHeight() - c.y),
                        (c.scaleX = (c.x * c.opt.scale) / d),
                        (c.scaleY = (c.y * c.opt.scale) / e),
                        (c.outOfRangeX =
                            c.scaleX > c.opt.scale
                                ? c.scaleX - c.opt.scale
                                : 0 > c.scaleX
                                ? c.scaleX
                                : 0),
                        (c.outOfRangeY =
                            c.scaleY > c.opt.scale
                                ? c.scaleY - c.opt.scale
                                : 0 > c.scaleY
                                ? c.scaleY
                                : 0),
                        (c.outOfRange =
                            "h" == c.opt.orientation
                                ? c.outOfRangeX
                                : c.outOfRangeY),
                        (c.value =
                            "undefined" != typeof b
                                ? "h" == c.opt.orientation
                                    ? c.x >= this.outerWidth()
                                        ? c.opt.scale
                                        : 0 >= c.x
                                        ? 0
                                        : c.scaleX
                                    : c.y >= this.outerHeight()
                                    ? c.opt.scale
                                    : 0 >= c.y
                                    ? 0
                                    : c.scaleY
                                : "h" == c.opt.orientation
                                ? c.scaleX
                                : c.scaleY),
                        "h" == c.opt.orientation
                            ? c.level.width(Math.floor((100 * c.x) / d) + "%")
                            : c.level.height(Math.floor((100 * c.y) / e)),
                        "function" == typeof c.opt.callback &&
                            c.opt.callback(c);
                }
            },
        }),
            (a.fn.simpleSlider = a.simpleSlider.init),
            (a.fn.updateSliderVal = a.simpleSlider.updateSliderVal);
    })(jQuery),
    (function (a) {
        (a.mbCookie = {
            set: function (a, b, c, d) {
                "object" == typeof b && (b = JSON.stringify(b)),
                    (d = d ? "; domain=" + d : "");
                var e = new Date(),
                    f = "";
                c > 0 &&
                    (e.setTime(e.getTime() + 864e5 * c),
                    (f = "; expires=" + e.toGMTString())),
                    (document.cookie = a + "=" + b + f + "; path=/" + d);
            },
            get: function (a) {
                a += "=";
                for (
                    var b = document.cookie.split(";"), c = 0;
                    c < b.length;
                    c++
                ) {
                    for (var d = b[c]; " " == d.charAt(0); )
                        d = d.substring(1, d.length);
                    if (0 == d.indexOf(a))
                        try {
                            return JSON.parse(d.substring(a.length, d.length));
                        } catch (e) {
                            return d.substring(a.length, d.length);
                        }
                }
                return null;
            },
            remove: function (b) {
                a.mbCookie.set(b, "", -1);
            },
        }),
            (a.mbStorage = {
                set: function (a, b) {
                    "object" == typeof b && (b = JSON.stringify(b)),
                        localStorage.setItem(a, b);
                },
                get: function (a) {
                    if (!localStorage[a]) return null;
                    try {
                        return JSON.parse(localStorage[a]);
                    } catch (b) {
                        return localStorage[a];
                    }
                },
                remove: function (a) {
                    a ? localStorage.removeItem(a) : localStorage.clear();
                },
            });
    })(jQuery);

//------------- DETAIL ADD - MINUS COUNT ORDER -------------//
$(".btn-number").click(function (e) {
    e.preventDefault();

    fieldName = $(this).attr("data-field");
    type = $(this).attr("data-type");
    var input = $("input[name='" + fieldName + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if (type == "minus") {
            if (currentVal > input.attr("data-min")) {
                input.val(currentVal - 1).change();
            }
            if (parseInt(input.val()) == input.attr("data-min")) {
                $(this).attr("disabled", true);
            }
        } else if (type == "plus") {
            if (currentVal < input.attr("data-max")) {
                input.val(currentVal + 1).change();
            }
            if (parseInt(input.val()) == input.attr("data-max")) {
                $(this).attr("disabled", true);
            }
        }
    } else {
        input.val(0);
    }
});
$(".input-number").focusin(function () {
    $(this).data("oldValue", $(this).val());
});
$(".input-number").change(function () {
    minValue = parseInt($(this).attr("data-min"));
    maxValue = parseInt($(this).attr("data-max"));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr("name");
    if (valueCurrent >= minValue) {
        $(
            ".btn-number[data-type='minus'][data-field='" + name + "']"
        ).removeAttr("disabled");
    } else {
        alert("Sorry, the minimum value was reached");
        $(this).val($(this).data("oldValue"));
    }
    if (valueCurrent <= maxValue) {
        $(
            ".btn-number[data-type='plus'][data-field='" + name + "']"
        ).removeAttr("disabled");
    } else {
        alert("Sorry, the maximum value was reached");
        $(this).val($(this).data("oldValue"));
    }
});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if (
        $.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if (
        (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
        (e.keyCode < 96 || e.keyCode > 105)
    ) {
        e.preventDefault();
    }
});
