/* const userName = document.querySelector('#loginId')
const nkName = document.querySelector('#nickname') */


/**
 * @description 对部分表单进行验证
 * @param id id选择器 
 * @param validataFn 回调函数
 */
function validateField(id,validataFn) {
  const dom = getDom(id)
  dom.onblur = async function() {
    validata(dom,validataFn)
  }
}

async function validata(dom,validataFn) {
  const validataText = await validataFn(dom.value)
  if (validataText) {
    dom.nextElementSibling.innerText = validataText
    return false
  } else {
    dom.nextElementSibling.innerText = ''
    return true
  }
}

async function allValidata(list) {
  console.dir(list);
  const result = list.map(item => {
    return validata(item.dom,item.validataFn)
  })
  const passlist = await Promise.all(result)
  console.log(passlist,'passlist');
  return passlist.every(item => item)
}

// console.log(userName,'userName');
const validataFn = (value) => {
  if(!value) {
    return '请输入账号'
  } else {
    return new Promise(resolve => {
      setTimeout(() => {
        if (value === '22') {
          resolve('账号已经被注册了') 
        } else {
          resolve()
        } 
      },1500)
    })
  }
}
validateField('loginId',validataFn)

/* function test() {
  allValidata([{dom:getDom('loginId'),validataFn}]).then(res => {
    if(res) {
      console.log('通过');
    } else {
      console.log('不通过');
    }
  })
}
test() */

const form = getDom('form')
form.onsubmit = (e) => {
  e.preventDefault();
  allValidata([{dom:getDom('loginId'),validataFn}]).then(res => {
    if(res) {
      console.log('通过');
    } else {
      console.log('不通过');
    }
  })
}