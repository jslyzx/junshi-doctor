/**
 * 医生端与专员端 核心业务逻辑
 */

window.App = {
    // 根据手机号判断角色
    identifyRole: function (phone) {
        if (phone.endsWith('888')) return 'doctor';
        if (phone.endsWith('999')) return 'helper';
        return 'doctor'; // 默认进入医生端
    },

    // 登录
    login: function (phone) {
        const role = this.identifyRole(phone);
        const user = {
            id: 'DR' + Math.floor(Math.random() * 1000),
            name: role === 'doctor' ? '黄晓雅' : '张助理',
            title: role === 'doctor' ? '主治医师' : '项目专员',
            dept: '肿瘤科',
            hospital: '南京鼓楼医院',
            phone: phone,
            role: role,
            isLoggedIn: true
        };
        localStorage.setItem('doctor_user', JSON.stringify(user));
        return user;
    },

    // 检查权限
    checkAuth: function (pageName) {
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

    getUser: function () {
        return JSON.parse(localStorage.getItem('doctor_user') || '{}');
    },

    logout: function () {
        localStorage.removeItem('doctor_user');
        window.location.href = 'login.html';
    },

    navigateTo: function (url) {
        window.location.href = url;
    },

    getTimeline: function (patientId) {
        let baseTimeline = [...MockData.timeline];
        const localData = localStorage.getItem('patient_supplements_' + patientId);
        const saved = localData ? JSON.parse(localData) : [];
        const mock = MockData.supplements.filter(s => s.patientId == patientId);
        const supplements = [...mock, ...saved];

        supplements.forEach(s => {
            baseTimeline.push({
                id: 'sup_' + s.id,
                date: s.date,
                title: s.title,
                content: s.content,
                photos: s.photos,
                type: 'info',
                isSupplement: true
            });
        });

        return baseTimeline.sort((a, b) => new Date(b.date) - new Date(a.date));
    },

    getPatient: function (id) {
        return MockData.patients.find(p => p.id == id);
    }
};

window.MockData = {
    // 首页待办
    todoList: [
        { id: 10, type: '入组确认', time: '刚刚', patient: '吴建国', desc: '专员已提交入组申请，请确认', priority: 'high' },
        { id: 11, type: '入组确认', time: '10:00', patient: '林春梅', desc: '资料核验已通过，待入组确认', priority: 'high' },
        { id: 12, type: '入组确认', time: '09:30', patient: '郑大成', desc: '知情同意书已签署，待入组确认', priority: 'high' },
        { id: 1, type: 'AE上报', time: '10:24', patient: '张建军', desc: '发生 2 级皮疹，伴瘙痒', priority: 'high' },
        { id: 2, type: '服药异常', time: '昨天', patient: '赵刚', desc: '患者反馈漏服一次试验药物', priority: 'medium' }
    ],
    // 入组确认待处理数据
    enrollTasks: [
        {
            id: 10,
            patient: '吴建国',
            age: '58',
            gender: '男',
            diagnosis: '非小细胞肺癌',
            stage: 'IV 期',
            helper: '张助理',
            submitTime: '2024-04-30 16:20',
            phone: '138****8888',
            address: '上海市浦东新区张江路 888 弄',
            idCardPhoto: 'https://images.unsplash.com/photo-1554224155-1696413575b3?w=400',
            diagnosisPhoto: 'https://images.unsplash.com/photo-1576091160550-2173dad99978?w=400',
            consentPhotos: [
                'https://images.unsplash.com/photo-1584433144859-1fc3ab84a9ec?w=400',
                'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400'
            ]
        }
    ],

    // 患者列表
    patients: [
        { id: 101, name: '沈传浩', age: 52, status: '已入组', statusTag: 'success', phone: '15201234701', enrollDate: '2024-03-15', ae: '有', medicationStatus: '用药中', riskLevel: 'green' },
        { id: 102, name: '张英杰', age: 45, status: '筛选中', statusTag: 'warning', phone: '13811223344', enrollDate: '-', ae: '无', medicationStatus: '未确认', riskLevel: 'green' },
        { id: 103, name: '王丽华', age: 61, status: '随访中', statusTag: 'active', phone: '13599887766', enrollDate: '2024-02-10', ae: '无', medicationStatus: '用药中', riskLevel: 'yellow' },
        { id: 104, name: '刘保平', age: 48, status: '发生 AE', statusTag: 'danger', phone: '17300000000', enrollDate: '2024-04-01', ae: '有', medicationStatus: '暂停', riskLevel: 'red' },
        { id: 105, name: '赵大勇', age: 55, status: '出组', statusTag: 'muted', phone: '13900112233', enrollDate: '2023-11-20', ae: '无', medicationStatus: '停药', riskLevel: 'green' }
    ],

    // 患者时间轴 (全景视图)
    timeline: [
        { date: '2024-03-01', title: '初诊入库', content: '门诊部初步诊断并转入项目组筛选。', type: 'milestone' },
        { date: '2024-03-05', title: '签署知情同意书', content: '由专员张助理协助完成纸质签署。', type: 'check' },
        { date: '2024-03-15', title: '正式入组', content: '符合入排标准，触发给药流程。', type: 'success' },
        { date: '2024-04-10', title: '给药周期 1', content: '完成首轮 PD-1 输注，状态良好。', type: 'info' },
        { date: '2024-04-18', title: '发生 AE (皮疹)', content: '患者自述局部瘙痒，评定为 2 级。', type: 'danger' }
    ],
    // 补充材料
    supplements: [
        { id: 1, patientId: 101, date: '2024-04-20', title: '补充材料: 门诊病历', content: '专员协助上传的门诊复查记录。', photos: ['https://picsum.photos/id/40/400/600'], type: 'info' }
    ]
};
