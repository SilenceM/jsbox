$app.strings = {
  "en": {
    "MAIN_TITLE": "Currency"
  },
  "zh-Hans": {
    "MAIN_TITLE": "汇率转换"
  }
}

$ui.render({
  props: {
    title: $l10n("MAIN_TITLE")
  },
  views: [{
      type: "input",
      props: {
        type: $kbType.decimal,
        text: "1",
        font: $font("bold", 20),
        align: $align.center,
        clearButtonMode: 0,
      },
      layout: function(make) {
        make.left.top.equalTo(10)
        make.size.equalTo($size(120, 32))
      },
      events: {
        changed: function(sender) {
          console.log(sender)
          calc("USD", Number(sender.text))
          calc("HKD", Number(sender.text))
          calc("JPY", Number(sender.text))
        }
      }
    },
    {
      type: "label",
      props: {
        text: "USD",
        font: $font("bold", 20)
      },
      layout: function(make) {
        var input = $("input")
        make.left.equalTo(input.right).offset(10)
        make.centerY.equalTo(input)
      }
    },
    {
      type: "label",
      props: {
        id: "USD",
        text: "CNY",
        font: $font("bold", 20),
        align: $align.right
      },
      layout: function(make) {
        make.right.inset(10)
        make.centerY.equalTo($("input"))
      }
    },
    {
      type: "label",
      props: {
        text: "HKD",
        font: $font("bold", 20)
      },
      layout: function(make) {
        var input = $("input")
        make.left.equalTo(input.right).offset(10)
        make.top.equalTo(input.top).offset(40)
      }
    },
    {
      type: "label",
      props: {
        id: "HKD",
        text: "CNY",
        font: $font("bold", 20),
        align: $align.right
      },
      layout: function(make) {
        make.right.inset(10)
        make.top.inset(50)
      }
    },
    {
      type: "label",
      props: {
        text: "JPY",
        font: $font("bold", 20)
      },
      layout: function(make) {
        var input = $("input")
        make.left.equalTo(input.right).offset(10)
        make.top.equalTo(input.top).offset(70)
      }
    },
    {
      type: "label",
      props: {
        id: "JPY",
        text: "CNY",
        font: $font("bold", 20),
        align: $align.right
      },
      layout: function(make) {
        make.right.inset(10)
        make.top.inset(80)
      }
    },
    {
      type: "label",
      props: {
        id: "date",
        textColor: $color("lightGray"),
        align: $align.center
      },
      layout: function(make) {
        make.left.right.equalTo(0)
        make.top.equalTo($("input").bottom).offset(100)
        make.height.equalTo(24)
      }
    }
  ],
  events: {
    tapped: function(sender) {
      $("input").blur()
    }
  }
})

var rateObj = {
  "USD": 0.0,
  "HKD": 0.0,
  "JPY": 0.0
}
var UrlObj = {
  "USD": "http://api.fixer.io/latest?base=USD&symbols=CNY",
  "HKD": "http://api.fixer.io/latest?base=HKD&symbols=CNY",
  "JPY": "http://api.fixer.io/latest?base=JPY&symbols=CNY"
}
$ui.loading(true)
function reqCurrency (currency) {
  $http.get({
    url: UrlObj[currency],
    handler: function(resp) {
      $ui.loading(false)
      rateObj[currency] = resp.data.rates.CNY
      calc(currency, 1)
      $("date").text = new Date().toLocaleTimeString()
      $("input").focus()
    }
  })
}
reqCurrency("USD")
reqCurrency("HKD")
reqCurrency("JPY")
function calc(currency, number) {
  console.log(currency)
  console.log($(currency))
  $(currency).text = (number * rateObj[currency]).toFixed(2) + " CNY"
}
