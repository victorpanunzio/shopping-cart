
export const generateData = (classname, fields) => {
    const inputfields = document.getElementsByClassName(classname);
    const data = new Object();
    let propsName;
    let propsValue;
    for (let i = 0; i < inputfields.length; i++) {
      propsName = inputfields[i].id;
      propsValue = fields[i];
      data['' + propsName + ''] = propsValue;
    }
    return data;
};

export const storageData = (key, value) => localStorage.setItem(key, value);
