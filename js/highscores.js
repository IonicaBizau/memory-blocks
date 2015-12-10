var Highscores = {
    get: function () {
        var ls = localStorage.getItem("highscores") || "";
        try {
            ls = JSON.parse(ls);
        } catch (e) {
            ls = {}
        }
        return this.sort(ls);
    }
  , _sort: function (by) {
        return function (a, b) {
            if (by === "time") {
                return a[by] < b[by];
            } else {
                return a[by] > b[by];
            }
        }
    }
  , sort: function (ls) {
        return {
            fastestTimes: (ls.fastestTimes || []).sort(this._sort("time")).slice(0, 5)
          , fewestPairs: (ls.fewestPairs || []).sort(this._sort("pairs")).slice(0, 5)
        };
    }
  , check: function (pairs, time) {
        var s = this.get();
        // 0 - no highscores
        // 1 - fastesttimes
        // 2 - fewestpairs
        // 3 - fastesttimes && fewestpairs
        if (
             (!s.fastestTimes.length && !s.fewestPairs.length)
          || (s.fastestTimes.slice(-1)[0].time > time && s.fewestPairs.slice(-1)[0].pairs > pairs)
        ) {
            return 3;
        }

        if (!s.fastestTimes.length || s.fastestTimes.slice(-1)[0].time > time) {
            return 1;
        }

        if (!s.fewestPairs.length || s.fewestPairs.slice(-1)[0].pairs > pairs) {
            return 2;
        }

        return 0;
    }
  , obj: function (name, time, pairs) {
        return {
            name: name
          , time: time
          , pairs: pairs
          , timestamp: new Date().getTime()
        };
    }
  , insert: function (name, time, pairs) {
        var s = this.get()
          , where = this.check(time, pairs)
          , obj = this.obj(name, time, pairs)
          ;

        switch (where) {
            case 1:
                s.fastestTimes.push(obj);
                break;
            case 2:
                s.fewestPairs.push(obj);
                break;
            case 3:
                s.fastestTimes.push(obj);
                s.fewestPairs.push(obj);
                break;
        }

        localStorage.setItem("highscores", JSON.stringify(s));

        return obj;
    }
};
