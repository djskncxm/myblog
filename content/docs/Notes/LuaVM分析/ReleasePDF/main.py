import os
import shutil
from PyPDF2 import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
import io
from datetime import datetime

# 中文作者
AUTHOR = "人生导师"

# 收货方列表
RECIPIENTS = [
    "2737225073",
    "2918735036",
    "1280141167",
    # "2316855708",
    "1405390446",
]

# 注册中文字体
pdfmetrics.registerFont(TTFont("WenKai", "./LXGWWenKai_Regular.ttf"))

# 输入 PDF 根文件夹
INPUT_FOLDER = "./PDF"


def create_watermark(recipient):
    """生成水印页面，带收货方信息"""
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=A4)

    c.setFont("WenKai", 12)
    c.setFillAlpha(0.15)
    width, height = A4

    c.saveState()
    c.translate(width / 2, height / 2)
    c.rotate(45)

    for y in range(-500, 500, 200):
        c.drawCentredString(0, y, f"作者: {AUTHOR}")
        c.drawCentredString(0, y - 30, f"授权给QQ: {recipient}")
        c.drawCentredString(0, y - 60, datetime.now().strftime("%Y-%m-%d"))

    c.restoreState()
    c.save()
    packet.seek(0)
    return PdfReader(packet).pages[0]


def add_watermark(input_pdf_path, output_pdf_path, recipient):
    reader = PdfReader(input_pdf_path)
    writer = PdfWriter()
    watermark = create_watermark(recipient)

    for page in reader.pages:
        page.merge_page(watermark)
        writer.add_page(page)

    os.makedirs(os.path.dirname(output_pdf_path), exist_ok=True)
    with open(output_pdf_path, "wb") as f:
        writer.write(f)
    print(f"[完成] {output_pdf_path}")


def main():
    for recipient in RECIPIENTS:
        output_folder = f"./{recipient}"
        os.makedirs(output_folder, exist_ok=True)

        # 批量处理 PDF，递归
        for root, dirs, files in os.walk(INPUT_FOLDER):
            for file in files:
                if file.lower().endswith(".pdf"):
                    input_pdf_path = os.path.join(root, file)
                    relative_path = os.path.relpath(input_pdf_path, INPUT_FOLDER)
                    output_pdf_path = os.path.join(output_folder, relative_path)
                    add_watermark(input_pdf_path, output_pdf_path, recipient)

        # 处理完毕后压缩成 ZIP
        zip_filename = f"{recipient}.zip"
        shutil.make_archive(recipient, "zip", output_folder)
        print(f"[打包完成] {zip_filename}")


if __name__ == "__main__":
    main()
