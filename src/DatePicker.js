import React,{Component} from 'react'
import './DatePicker.css'
import $ from 'jquery'


    export default function DatePicker($target){
      this.$target=$target
      this.init()
      this.bind()
    }
    DatePicker.prototype={
      init:function(){
        this.today=new Date();
        this.date=this.today.getDate()
        console.log(this.date)
        this.year=this.today.getFullYear()
        this.month=this.today.getMonth()+1

        var template='<div class="datepicker-wrap">'
                      +'<div class="datepicker-header">'
                        +'<a href="javascript:void(0)" class="datepicker-btn datepicker-pre-btn"><</a>'
                        +'<span class="year"></span>'
                        +'<a href="javascript:void(0)" class="datepicker-btn datepicker-next-btn">></a>'
                      +'</div>'
                      +'<div class="datepicker-body">'
                        +'<table>'
                          +'<thead>'
                            +'<tr>'
                              +'<td>日</td>'
                              +'<td>一</td>'
                              +'<td>二</td>'
                              +'<td>三</td>'
                              +'<td>四</td>'
                              +'<td>五</td>'
                              +'<td>六</td>'
                            +'</tr>'
                          +'</thead>'
                          +'<tbody>'
                          +'</tbody>'
                        +'</table>'
                      +'</div>'
                    +'</div>'
        this.$datepicker=$(template)
        this.$datepicker.insertAfter(this.$target)
                        .css({
                          'position': 'absolute',
                          'right': -54,
                          'top': 39
                        })
        this.getData(this.year,this.month)
      },

      getData:function(year,month){
        var _this=this
        this.data=[]
        //当月第一天
        let firstDayOfMonth=new Date(year,month-1,1)
        //当月最后一天
        let lastDayOfMonth=new Date(year,month,0)
        //上个月最后一天
        let lastDayOfLastMonth=new Date(year,month-1,0).getDate()
        //当月第一天是星期几
        let firstDayWeekDay=firstDayOfMonth.getDay()
        //当月最后一天的日期
        let lastDate=lastDayOfMonth.getDate()

        let lastMonthDayCount=firstDayWeekDay

        for (var i = 0; i < 7*6; i++) {
          var date=i+1-lastMonthDayCount
          var showDate=date
          var thatMonth=undefined
          var thatyear=year
          if (date<=0) {
            //上一个月
            var thatmonth=month-1
            showDate=lastDayOfLastMonth+date
          }else if(date>lastDate){
            //下一个月
            var thatmonth=month+1
            showDate=showDate-lastDate
          }else{
            //当月
            var thatmonth=month
          }
          if (thatMonth===0) {
            thatmonth=12
            thatyear=year-1
          }
          if(thatmonth===13) {
            var thatmonth=1
            thatyear=year+1
          }
          this.data.push({
            year:thatyear,
            month:thatmonth,
            date:date,
            showDate:showDate
          })
        }
        console.log(this.data)
        _this.createDatePicker(year,month)
      },

      createDatePicker:function(year,month){
        var _this=this
        var html=''
        _this.$datepicker.find('.year').text(''+year+'-'+month+'')
        this.data.forEach(function(data,index){
          if (index%7===0) {
            html+='<tr>'
          }
          if (data.month<month) {
            html+='<td class="pre-month" data-date="'+data.year+'-'+data.month+'-'+data.showDate+'">'+data.showDate+'</td>'
          }
          if (data.month>month) {
            html+='<td class="next-month" data-date="'+data.year+'-'+data.month+'-'+data.showDate+'">'+data.showDate+'</td>'
          }
          if (data.month==month){
            if (data.showDate==_this.date&&data.month==_this.month){
              html+='<td class="cur-month cur-date" data-date="'+data.year+'-'+data.month+'-'+data.showDate+'">'+data.showDate+'</td>'
            }else{
              html+='<td class="cur-month" data-date="'+data.year+'-'+data.month+'-'+data.showDate+'">'+data.showDate+'</td>'
            }
          }
          if (index%7===6) {
            html+='</tr>'
          }
        })
        this.$datepicker.find('.datepicker-body table tbody').html($(html))
      },

      bind:function(){
        var _this=this
        var month=this.month
        var year=this.year
        //上一月
        this.$datepicker.find('.datepicker-pre-btn').on('click', function(){
          month--
          if (month<=0) {
            month=12
            year=year-1
          }
          _this.getData(year,month)
          _this.showDatePicker()
        })
        //下一月
        this.$datepicker.find('.datepicker-next-btn').on('click', function(){
          month++
          if (month>=13) {
            month=1
            year=year+1
          }
          _this.getData(year,month)
          _this.showDatePicker()
        })
        //点击当月日期
        this.$datepicker.on('click', '.cur-month', function(e){
          e.stopPropagation()
          _this.$target.val($(this).attr('data-date'))
          _this.hideDatePicker()
        })

        //展开日历
        this.$target.on('click', function(e){
          e.stopPropagation()
          _this.showDatePicker()
        })
        //下面设置点击页面其他部分隐藏 datepicker
        this.$datepicker.on('click', function(e){
          e.stopPropagation()
        })
        $(window).on('click', function(e){
          _this.hideDatePicker()
        })
      },

      showDatePicker:function(){
        this.$datepicker.slideDown()
      },

      hideDatePicker:function(){
        this.$datepicker.slideUp()
      }
    }
  


