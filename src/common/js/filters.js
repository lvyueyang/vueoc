//距离日期格式化
const format = (value)=>{
  let time = value.split(' ');
  let Y = time[0].split('-');
  let H = time[1].split('-');

  let date = new Date();
  let years = parseFloat(date.getFullYear());
  let month = parseFloat(date.getMonth()) + 1;
  let day = parseFloat(date.getDate());
  let hours = parseFloat(date.getHours());
  let minutes = parseFloat(date.getMinutes());
  let seconds = parseFloat(date.getSeconds());

  if(Y[0] < years){
    let t =  parseFloat(years) - parseFloat(Y[0]);
    return t + '年前';
  }else if(Y[1] > month){
    let t = parseFloat(month) - parseFloat(Y[1]);
    return t + '个月前';
  }else if(Y[2] > day){
    let t = parseFloat(day) - parseFloat(Y[2]);
    if(Y[2] == day){
      return '今天';
    }else if(t == 1){
      return '昨天';
    }else if(t == 2){
      return '前天';
    }else{
      return t + '天前';
    }
  }else if(H[0] > hours){
    let t = parseFloat(hours) - parseFloat(H[0]);
    return t + '小时前';
  }else if(H[0] == hours){
    return '刚刚';
  }else{
    let t = parseFloat(hours) - parseFloat(H[0]);
    return t + '小时前';
  }
};

export default {
  format
}
