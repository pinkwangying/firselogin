

class ValidateField {
  constructor(id,validataFn) {
    this.input = getDom(id)
    this.p = this.input.nextElementSibling
    this.validataFn = validataFn
    this.input.onblur = () => {
      this.validata()
    }
  }


  async validata() {
    const validataText = await this.validataFn(this.input.value)
    if (validataText) {
      this.p.innerText = validataText
      return false
    } else {
      this.p.innerText = ''
      return true
    }
  }
  static async validata(...all) {
    const allValidataList = all.map(item => {
      return item.validata()
    })
    const result = await Promise.all(allValidataList)
    return result.every(item => item)
  }
}


var login = new ValidateField('loginId',(value) => {
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
})
var nickname = new ValidateField('nickname',(value) => {
  if(!value) {
    return '请输入密码'
  }
})

const form = getDom('form')
form.onsubmit = (e) => {
  e.preventDefault();
  ValidateField.validata(login,nickname).then(isPass => {
    if (isPass) {
      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries());
      console.log(data,'datadatadatadata');
      console.log('通过');
    } else {
      console.log('不通过');
    }
  })
}

