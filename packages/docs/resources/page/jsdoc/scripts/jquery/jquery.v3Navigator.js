!(function (s) {
  var Navigator = function (config) {
    this.datas = config.datas || []
    this.opened = config.openedKey || '_open'
    this.itemClick = config.itemClick || null
    this.el = null
  }

  Navigator.prototype = {
    _getItemByUrl: function (url, items) {
      url = url.split('#')[0]
      items = typeof items == 'undefined' ? this.datas : items
      if (items && items.length) {
        for (var i = 0, l = items.length; i < l; i++) {
          var item = items[i]
          var itemUrl = item.url
          if (itemUrl) {
            itemUrl = itemUrl.split('?')[0]
          }
          if (itemUrl == url) {
            return item
          } else {
            var res = this._getItemByUrl(url, item.children ? item.children : null)
            if (res != null) {
              return res
            }
          }
        }
      }
      return null
    },

    _getOpenedItem: function () {
      var href = window.location.href
      var hrefStr = href.split('#')[0]
      var queryStr = hrefStr.split('?')
      if (queryStr.length > 1) {
        queryStr = queryStr[1]
        queryPair = queryStr.split('&')
        for (var i = 0, l = queryPair.length; i < l; i++) {
          var pair = queryPair[i]
          var param = pair.split('=')
          if (param[0] == this.opened) {
            return param[1]
          }
        }
      }
      return null
    },
    _specialChars:['~'],
    _escapeSelector: function(selector){
      if(typeof selector !== 'string'){
        return selector;
      }
      var selectors = [];
      for(var i=0,l=selector.length;i<l;i++){
        var ch = selector.charAt(i);
        if(this._specialChars.indexOf(ch)!=-1){
          selectors.push('\\');
          
        }
        selectors.push(ch);
      }
      return selectors.join('');
    },

    _open: function (container) {
      var opened = this._getOpenedItem()
      opened = this._escapeSelector(opened);
      var item = s('#' + opened)
      if (item) {
        var parents = item.parents()
        var parentIds = []
        for (var i = 0, l = parents.length; i < l; i++) {
          var parent = $(parents[i])
          if (parent.prop('tagName') == 'LI') {
            parentIds.push(parent.attr('id'))
          }
          if (parent[0] == container[0]) {
            break
          }
        }
        parentIds = parentIds.reverse()
        for (var i = 0, l = parentIds.length; i < l; i++) {
          var parentId = parentIds[i]
          this._openFolder(parentId)
        }
        container.find('li').removeClass('active')
        item.addClass('active')
      }
    },

    _getItemInnerHtml: function (item) {
      var html = ["<li id='" + item.id + "'>"]
      html.push("<a href='javascript:void(0);' title='")
      html.push(item.title)
      html.push("'")
      html.push(" item_id='")
      html.push(item.id)
      html.push("'>")
      html.push('<i ')
      html.push("item_id='")
      html.push(item.id)
      html.push("'")
      html.push(" class='fa")
      html.push(item.children && item.children.length ? ' fa-angle-right' : '')
      html.push(" leftNavIcon'></i>")
      html.push(item.title)
      html.push('</a>')
      if (item.children && item.children.length) {
        for (var i = 0, l = item.children.length; i < l; i++) {
          html.push('<ul>')
          html.push(this._getItemInnerHtml(item.children[i]))
          html.push('</ul>')
        }
      }
      html.push('</li>')
      return html.join('')
    },

    _openFolder: function (itemId) {
      var el = $('#' + itemId)
      var children = el.children()
      if (children && children.length) {
        for (var i = 0, l = children.length; i < l; i++) {
          var child = $(children[i])
          if (['UL', 'LI'].indexOf(child.prop('tagName')) != -1) {
            child.show()
          }
        }
      }
      $("i[item_id='" + itemId + "']")
        .removeClass('fa-angle-right')
        .addClass('fa-angle-down')
    },

    _closeFolder: function (itemId) {
      var el = $('#' + itemId)
      var children = el.children()
      if (children && children.length) {
        for (var i = 0, l = children.length; i < l; i++) {
          var child = $(children[i])
          if (['UL', 'LI'].indexOf(child.prop('tagName')) != -1) {
            child.hide()
          }
        }
      }
      $("i[item_id='" + itemId + "']")
        .removeClass('fa-angle-down')
        .addClass('fa-angle-right')
    },

    isLeaf: function (itemId) {
      var el = $('#' + itemId)
      var children = el.children('ul')
      return children.size() == 0
    },

    _getItemById: function (item_id, items) {
      items = typeof items == 'undefined' ? this.datas : items
      if (items && items.length) {
        for (var i = 0, l = items.length; i < l; i++) {
          var item = items[i]
          if (item.id == item_id) {
            return item
          } else {
            var res = this._getItemById(item_id, item.children ? item.children : null)
            if (res != null) {
              return res
            }
          }
        }
      }
      return null
    },

    toggle: function (item_id) {
      var el = $("i[item_id='" + item_id + "']")
      if (el.hasClass('fa-angle-right')) {
        this._openFolder(el.attr('item_id'))
      } else if (el.hasClass('fa-angle-down')) {
        this._closeFolder(el.attr('item_id'))
      }
    },

    _addListener: function (container) {
      var _this = this
      container.find('i').on('click', function () {
        var item_id = $(this).attr('item_id')
        _this.toggle(item_id)
        return false
      })
      container.find('a').on('click', function () {
        var el = $(this)
        var itemId = el.attr('item_id')
        var item = _this._getItemById(itemId)
        _this._handleClick(item)
      })
    },

    _handleClick: function (item, url) {
      var itemId = item.id
      var parentIds = []
      $("a[item_id='" + itemId + "']")
        .parents('li')
        .each(function (id, dom) {
          var id = $(dom).attr('id')
          if (id != itemId) {
            parentIds.push(id)
          }
        })
      parentIds = parentIds.reverse()
      for (var i = 0, l = parentIds.length; i < l; i++) {
        this._openFolder(parentIds[i])
      }
      var container = $(this.el)
      container.find('.active').each(function () {
        $(this).removeClass('active')
      })
      container.find("li[id='" + itemId + "']").addClass('active')
      var handler = this.itemClick
      if (handler) {
        handler.call(this, item.id, item, url)
      }
    },

    draw: function (el) {
      if (el.size() > 0) {
        var html = ["<ul id='leftNavigation' class='master'>"]
        for (var i = 0, l = this.datas.length; i < l; i++) {
          html.push(this._getItemInnerHtml(this.datas[i]))
        }
        html.push('</ul>')
        el.html(html.join(''))
      }
      this.el = el
      this._addListener(el)
      this._open(el)
    },

    scrollTo: function (item) {
      var container = $(this.el)
      var top = $("i[item_id='" + item.id + "']").offset().top
      container[0].scrollTop = top
    },

    fireByUrl: function (url) {
      var item = this._getItemByUrl(url)
      if (item) {
        this._handleClick(item, url)
        this.scrollTo(item)
      }
    }
  }

  s.fn.v3Navigator = function (config) {
    var nav = new Navigator(config)
    nav.draw(this)
    return nav
  }
})(jQuery)
