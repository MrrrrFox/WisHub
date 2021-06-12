from io import BytesIO
from django.core.files import File
from PIL import Image

def make_thumbnail(image, size=(128, 128)):

    im = Image.open(image)
    file_format = im.format
    im.thumbnail(size)
    thumb_io = BytesIO()
    im.save(thumb_io, file_format, quality=85)
    thumbnail = File(thumb_io, name=image.name)

    return thumbnail