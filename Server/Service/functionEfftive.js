const sql = require('mssql');

// Hàm xác định kiểu dữ liệu dựa trên giá trị của trường
function getSqlType(value) {
    if (typeof value === 'string') {
        return value.length <= 50 ? sql.VarChar(value.length) : sql.NVarChar(value.length);
    }
    if (typeof value === 'number') {
        return Number.isInteger(value) ? sql.Int : sql.Decimal(10, 2);
    }
    if (value instanceof Date) {
        return sql.Date;
    }
    if (typeof value === 'boolean') {
        return sql.Bit;
    }
    return sql.NVarChar(255); // Mặc định trả về NVARCHAR
}

// Hàm xây dựng câu lệnh SQL cho UPDATE hoặc INSERT từ đối tượng dữ liệu
function buildQuery(valuesUpdateObject, tableName, whereCondition) {
    let query = `UPDATE ${tableName} SET `;
    let inputs = [];
    let setClauses = [];

    Object.keys(valuesUpdateObject).forEach(key => {
        let value = valuesUpdateObject[key];
        setClauses.push(`${key} = @${key}`);
        inputs.push({ key, value, type: getSqlType(value) });
    });

    query += setClauses.join(', ');
    query += ` WHERE ${whereCondition};`;

    return { query, inputs };
}

// Hàm thực thi câu lệnh SQL
async function executeQuery(pool, query, inputs) {
    try {
        const request = pool.request();
        inputs.forEach(input => {
            request.input(input.key, input.type, input.value);
        });

        const result = await request.query(query);
        return result;
    } catch (error) {
        console.error('Error executing query:', error);
    }
}

// Ví dụ sử dụng
async function updateSupplier(pool, supplierID, valuesUpdateObject) {
    const tableName = 'NHACUNGCAP';
    const whereCondition = `NCC_ID = '${supplierID}'`;

    // Xây dựng câu lệnh SQL UPDATE
    const { query, inputs } = buildQuery(valuesUpdateObject, tableName, whereCondition);

    // Thực thi câu lệnh SQL
    const result = await executeQuery(pool, query, inputs);
    console.log('Update result:', result);
}

export {getSqlType, buildQuery, executeQuery}