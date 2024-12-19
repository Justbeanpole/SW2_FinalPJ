const express = require('express');
const { Detail, User, Category } = require('../models'); // Sequelize 모델 가져오기
const { Op, Sequelize} = require('sequelize'); // Sequelize 연산자
const { parse } = require('date-fns'); // 날짜 파싱 라이브러리 (optional)
const router = express.Router();

router.get('/home', async function getDetailList(req, res) {
    try {
        // 요청에서 query 파라미터 가져오기
        const { userId, createdDate } = req.query;


        // 필수 파라미터 체크
        if (!userId || !createdDate) {
            return res.status(400).send({ error: 'userId와 createdDate를 모두 입력해주세요.' });
        }

        // String으로 전달된 날짜를 파싱
        const targetDate = new Date(createdDate);
        const targetYear = targetDate.getFullYear();
        const targetMonth = targetDate.getMonth() + 1; // JavaScript의 월은 0부터 시작하므로 +1


        // 사용자 조회
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ error: '사용자를 찾을 수 없습니다.' });
        }

        // 해당 사용자에 속한 Detail 중, 년도와 월이 일치하는 데이터 조회
        const details = await Detail.findAll({
            where: {
                user_id: userId, // 사용자 ID 필터
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('YEAR', Sequelize.col('created_date')),
                        targetYear // 특정 연도
                    ),
                    Sequelize.where(
                        Sequelize.fn('MONTH', Sequelize.col('created_date')),
                        targetMonth // 특정 월
                    )
                ]
            },
            order: [['created_date', 'ASC']] // 날짜 기준으로 정렬 (옵션)
        });

        return res.status(200).send(details);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send({ error: '서버 에러 발생' });
    }
});

router.get('/monthlyData', async (req, res) => {
    try {
        const { userId, createdDate } = req.query;
        console.log(createdDate);
        console.log(userId)

        // 필수 파라미터 확인
        if (!userId || !createdDate) {
            return res.status(400).send({ error: 'userId와 createdDate를 모두 입력해주세요.' });
        }

        // 날짜 파싱 및 연도 추출
        const targetDate = new Date(createdDate);
        const targetYear = targetDate.getFullYear();

        // 사용자 확인
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send({ error: '사용자를 찾을 수 없습니다.' });
        }

        // 사용자에 해당하는 모든 Detail 조회 (해당 연도 필터링)
        const details = await Detail.findAll({
            where: {
                user_id: userId,
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_date')), targetYear)
                ]
            }
        });

        // 월별 데이터 초기화 (1월~12월)
        const monthlyDataList = Array.from({ length: 12 }, (_, index) => ({
            month: index + 1,
            income: 0,
            expense: 0
        }));

        // 수입(INCOME)/지출(EXPENSE) 누적 계산
        details.forEach(detail => {
            const month = new Date(detail.createdDate).getMonth() + 1; // 월 추출
            const data = monthlyDataList[month - 1];

            if (detail.type === 0) { // INCOME
                data.income += detail.amount;
            } else if (detail.type === 1) { // EXPENSE
                data.expense += detail.amount;
            }
        });

        // 월별 데이터 정렬 (1~12월)
        monthlyDataList.sort((a, b) => a.month - b.month);

        // 결과 반환
        return res.status(200).send(monthlyDataList);
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).send({ error: '서버 에러 발생' });
    }
})

router.get('/categoryDetailsForYear', async (req, res) => {
    const usedColors = new Set();

// 고유한 랜덤 색상 생성 함수
    function generateUniqueRandomColor() {
        let color;
        do {
            color = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        } while (usedColors.has(color));
        usedColors.add(color);
        return color;
    }
// 카테고리별 연도 데이터 조회 함수
        const { userId, selectYear } = req.query;

        try {
            // 사용자 조회
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
            }

            // Detail 테이블에서 해당 사용자와 연도에 맞는 데이터 조회
            const userDetails = await Detail.findAll({
                where: {
                    user_id: userId,
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('created_date')), selectYear)
                    ]
                },
                raw: true, // Sequelize 결과를 JSON으로 반환
            });

            // 카테고리별 수익/지출 그룹화
            const categoryDataMap = {};

            userDetails.forEach((detail) => {
                const category = detail.category;

                if (!categoryDataMap[category]) {
                    categoryDataMap[category] = {
                        category: category,
                        income: 0,
                        expense: 0,
                        color: generateUniqueRandomColor(),
                    };
                }

                if (detail.type === 0) { // INCOME
                    categoryDataMap[category].income += detail.amount;
                } else if (detail.type === 1) { // EXPENSE
                    categoryDataMap[category].expense += detail.amount;
                }
            });

            // 카테고리별 데이터를 리스트로 변환
            const categoryDataList = Object.values(categoryDataMap);

            // 총 수익과 총 지출 계산
            const totalIncome = categoryDataList.reduce((sum, data) => sum + data.income, 0);
            const totalExpense = categoryDataList.reduce((sum, data) => sum + data.expense, 0);

            // 각 카테고리별 비율 계산
            const result = categoryDataList.map((data) => ({
                category: data.category,
                income: data.income,
                expense: data.expense,
                incomePercentage: totalIncome === 0 ? 0 : Math.floor((data.income * 100) / totalIncome),
                expensePercentage: totalExpense === 0 ? 0 : Math.floor((data.expense * 100) / totalExpense),
                color: data.color,
            }));

            // 결과 반환
            console.log(`Total Income: ${totalIncome}, Total Expense: ${totalExpense}`);
            return res.status(200).send(result);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ error: '서버 에러 발생' });
        }
})

router.get('/category', async (req,res) => {
    const { userId } = req.query;

    try {
        // 사용자 검증
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        // 해당 사용자에 속하는 카테고리 조회
        const categories = await Category.findAll({
            where: { user_id: userId }, // 사용자 ID로 필터링
            attributes: ['type', 'category_name'], // 필요한 필드만 선택
            raw: true, // 결과를 JSON 형식으로 반환
        });

        // INCOME과 EXPENSE로 나누기
        const incomeCategories = categories
            .filter(category => category.type === 0) // Type이 INCOME(0)
            .map(category => category.category_name);

        const expenseCategories = categories
            .filter(category => category.type === 1) // Type이 EXPENSE(1)
            .map(category => category.category_name);

        // 결과를 Map 형태로 반환
        const result = {
            INCOME: incomeCategories,
            EXPENSE: expenseCategories,
        };

        return res.status(200).send(result);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: '서버 에러 발생' });
    }
})

router.post('/createDetail', async (req, res) => {
    try {
        // 요청 데이터 추출
        const { date, type, amount, category, asset, content } = req.body;
        // 필수 데이터 검증
        if (
            !date ||
            (type !== 0 && type !== 1) ||
            !amount ||
            !category ||
            !asset ||
            !content
        ) {
            return res.status(400).json({ error: '모든 필드를 정확히 입력해주세요.' });
        }

        // Detail 레코드 생성
        const detail = await Detail.create({
            userId: 1, // userId 고정
            createdDate: new Date(date).toISOString(), // Date 객체
            type: type, // 0 또는 1
            amount: parseInt(amount, 10), // 숫자형
            category: category, // String
            asset: asset, // String
            content: content, // String
        });

        // 성공 응답 반환
        return res.status(201).send({ message: 'Detail 생성 성공', data: detail });
    } catch (error) {
        console.error('Detail 생성 오류:', error);
        return res.status(500).json({ error: '서버 에러 발생' });
    }
})

router.post('/delDetail', async (req, res) => {
    try {
        // 요청에서 params를 추출
        const { params } = req.body;
        const { detailIid } = params;

        // detailIid가 배열인지 확인
        if (!Array.isArray(detailIid) || detailIid.length === 0) {
            return res.status(400).json({ message: '삭제할 항목이 없습니다.' });
        }

        // Sequelize를 사용해 삭제
        await Detail.destroy({
            where: {
                id: detailIid, // id 배열에 해당하는 데이터 삭제
            },
        });

        return res.status(200).json({ message: '삭제 성공' });
    } catch (error) {
        console.error('삭제 실패:', error);
        return res.status(500).json({ message: '서버 에러 발생', error: error.message });
    }
});

router.post('/deleteCategory', async (req, res) => {
    try {
        // 요청에서 categoryName 추출
        const { categoryName } = req.body.data;

        // 필수 필드 확인
        if (!categoryName) {
            return res.status(400).json({ error: "categoryName을 입력해주세요." });
        }

        // 카테고리 삭제
        const deleted = await Category.destroy({
            where: { category_name: categoryName }
        });

        // 삭제 성공 여부 확인
        if (deleted === 0) {
            return res.status(404).json({ error: "해당 카테고리를 찾을 수 없습니다." });
        }

        // 성공 응답
        return res.status(200).json({ message: "카테고리가 삭제되었습니다." });
    } catch (error) {
        console.error("삭제 오류:", error);
        return res.status(500).json({ error: "서버 에러가 발생했습니다." });
    }
});

router.post('/createCategory', async (req, res) => {
    try {
        // 요청 데이터 가져오기
        const { userId, name, type } = req.body;
        console.log(userId, name, type)

        // 필수 값 검증
        if (!userId || !name) {
            return res.status(400).json({ error: "userId, name, type 모두 입력해주세요." });
        }

        // 사용자 존재 여부 확인
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
        }

        // 중복된 카테고리명 확인
        const existingCategory = await Category.findOne({
            where: { category_name: name, user_id: userId, type:type }
        });
        if (existingCategory) {
            return res.status(409).json({ error: "이미 존재하는 카테고리입니다." });
        }

        // 카테고리 생성
        const newCategory = await Category.create({
            userId: userId,
            categoryName: name,
            type: 0, // 기본값 (수입/지출 타입 설정 필요 시 프론트에서 전달받아 처리)
            createdDate: new Date(),
            modifiedDate: null,
        });

        // 성공 응답
        return res.status(201).json({
            message: "카테고리가 성공적으로 생성되었습니다.",
            category: newCategory
        });

    } catch (error) {
        console.error("카테고리 생성 오류:", error);
        return res.status(500).json({ error: "서버 에러가 발생했습니다." });
    }
});

module.exports = router;