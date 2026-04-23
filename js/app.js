/**
 * 医生端与专员端 核心业务逻辑
 */

window.App = {
    // 根据手机号判断角色
    identifyRole: function(phone) {
        if (phone.endsWith('888')) return 'doctor';
        if (phone.endsWith('999')) return 'helper';
        return 'doctor'; // 默认进入医生端
    },

    // 登录
    login: function(phone) {
        const role = this.identifyRole(phone);
        const user = {
            id: 'DR' + Math.floor(Math.random() * 1000),
            name: role === 'doctor' ? '黄晓燕' : '张助理',
            title: role === 'doctor' ? '主治医师' : '项目专员',
            dept: '胸内科',
            hospital: '君实附属第一医院',
            phone: phone,
            role: role,
            isLoggedIn: true
        };
        localStorage.setItem('doctor_user', JSON.stringify(user));
        return user;
    },

    // 检查权限
    checkAuth: function(pageName) {
        const user = JSON.parse(localStorage.getItem('doctor_user') || '{}');
        if (!user.isLoggedIn && pageName !== 'login.html') {
            window.location.href = 'login.html';
            return false;
        }
        if (user.isLoggedIn && pageName === 'login.html') {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    },

    getUser: function() {
        return JSON.parse(localStorage.getItem('doctor_user') || '{}');
    },

    logout: function() {
        localStorage.removeItem('doctor_user');
        window.location.href = 'login.html';
    },

    navigateTo: function(url) {
        window.location.href = url;
    }
};

window.MockData = {
    // 首页待办
    todoList: [
        { id: 1, type: 'AE 待处', time: '10:24', patient: '沈先生', desc: '发生 2 级皮疹，需审核处理意见', priority: 'high' },
        { id: 2, type: '数据录入', time: '昨天', patient: '001', desc: '请填写入选信息', priority: 'medium' },
        { id: 3, type: '随访确认', time: '昨天', patient: '003', desc: '随访 1 信息待确认', priority: 'medium' }
    ],

    // 患者列表
    patients: [
        { id: 101, name: '沈传浩', age: 52, status: '已入组', statusTag: 'success', phone: '15201234701', enrollDate: '2024-03-15', ae: '有' },
        { id: 102, name: '张英杰', age: 45, status: '筛选中', statusTag: 'warning', phone: '13811223344', enrollDate: '-', ae: '无' },
        { id: 103, name: '王丽华', age: 61, status: '随访中', statusTag: 'active', phone: '13599887766', enrollDate: '2024-02-10', ae: '无' },
        { id: 104, name: '刘保平', age: 48, status: '发生 AE', statusTag: 'danger', phone: '17300000000', enrollDate: '2024-04-01', ae: '有' },
        { id: 105, name: '赵大勇', age: 55, status: '出组', statusTag: 'muted', phone: '13900112233', enrollDate: '2023-11-20', ae: '无' }
    ],

    // 患者时间轴 (全景视图)
    timeline: [
        { date: '2024-03-01', title: '初诊入库', content: '门诊部初步诊断并转入项目组筛选。', type: 'milestone' },
        { date: '2024-03-05', title: '签署知情同意书', content: '由专员张助理协助完成纸质签署。', type: 'check' },
        { date: '2024-03-15', title: '正式入组', content: '符合入排标准，触发给药流程。', type: 'success' },
        { date: '2024-04-10', title: '给药周期 1', content: '完成首轮 PD-1 输注，状态良好。', type: 'info' },
        { date: '2024-04-18', title: '发生 AE (皮疹)', content: '患者自述局部瘙痒，评定为 2 级。', type: 'danger' }
    ]
};
