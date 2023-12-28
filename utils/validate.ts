export const validateEmail = (rule: any, value: string, callback: () => void) => {
    if (value === '') {
        callback(new Error('请输入邮箱'));
    } else {
        // 使用正则表达式验证邮箱格式
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(value)) {
            callback(new Error('邮箱格式不正确'));
        } else {

            callback();
        }
    }
};

export const validateIDCard = (rule: any, value: string, callback: () => void) => {
    if (value === '') {
      callback(new Error('请输入身份证号'));
    } else {
      // 正则表达式验证身份证格式
      const idPattern = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$/;
      if (!idPattern.test(value)) {
        callback(new Error('身份证号不正确'));
      } else {
        // 验证通过
        callback();
      }
    }
  };