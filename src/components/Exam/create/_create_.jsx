import {
	ChildColumn,
	ClassViewCustom,
	Column,
	TableProperties
} from "../../customs/class.styled";

function CreateExamComponent() {
	/// TODO: Code form tạo ra bài tập và giao bài tập cho học sinh trong lớp, đồng thời có các tùy chọn ( giao cho cá nhân, cho tập thể ; cho 1 lớp, cho nhiều lớp ) ///

	return (
		<ClassViewCustom>
			<h1>Trang giao bài tập</h1>
			<div>
				<div>
					<button>Tạo bài tập</button>
					<button>Mẫu bài tập được chia sẻ</button>
					<button>Bài tập đã hết hạn</button>
					<button>Các lớp học</button>
				</div>
				<TableProperties>
					<tbody>
						<Column c={7}>
							<ChildColumn as="th">STT</ChildColumn>
							<ChildColumn as="th">Tên bài tập</ChildColumn>
							<ChildColumn as="th">Ngày tạo</ChildColumn>
							<ChildColumn as="th">thể loại</ChildColumn>
							<ChildColumn as="th">Môn học</ChildColumn>
							<ChildColumn as="th">
								Đối tượng giao bài
							</ChildColumn>
							<ChildColumn as="th">Hành động</ChildColumn>
						</Column>
						<Column c={7} no_hover>
							<ChildColumn>1</ChildColumn>
							<ChildColumn>Test</ChildColumn>
							<ChildColumn>12/01/2022</ChildColumn>
							<ChildColumn>Câu hỏi trắc nghiệm</ChildColumn>
							<ChildColumn>Toán</ChildColumn>
							<ChildColumn>
								<div>Học sinh lớp 11D7</div>
								<div>Trần Văn A - 11D6 K22 cấp 3 Trung Giã</div>
								<div>Nguyễn Văn B - 12D7 K22 cấp 3 Nam Sơn</div>
							</ChildColumn>
							<ChildColumn>
								<button>Sửa</button>
								<button>Xóa</button>
							</ChildColumn>
						</Column>
					</tbody>
				</TableProperties>
			</div>
		</ClassViewCustom>
	);
}

export default CreateExamComponent;
