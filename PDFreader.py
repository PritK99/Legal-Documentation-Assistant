import PyPDF2
import re

def read_pdf(pdf_file):

  pdf_reader = PyPDF2.PdfReader(pdf_file)
  text = ""
  for page in pdf_reader.pages:
    text += page.extract_text()

  return text

if __name__ == "__main__":
  pdf_file = "doc_3Trademark_Transfer_Agreement.pdf"
  text = read_pdf(pdf_file)
  print(text)
  print(re.split(r"_+", text))
