# coding=utf-8
import os.path
import os
import json
import time

def read_directory(path, result):
    paths = os.listdir(path)
    childRoot = os.listdir(path)
    FilePath = path
    #print(path)
    isFile = True

    if os.path.isdir(path):
        # 判断是文件夹
        isFile = False
        result.update(childRoot=childRoot, FilePath=FilePath, isFile=isFile)

    #print(paths)

    # 如果是文件，则创建下列信息
    for i, item in enumerate(paths):
        # 跳过一些不用的文件
        if 'DS_Store' in item:
            #print("item ",item)
            continue
        # 输出文件基本信息
        sub_path = os.path.join(path, item)
        if os.path.isdir(sub_path):
            result[item] = {}
            result[item].update(name=item)
            read_directory(sub_path, result[item])
            print("Directory: ", sub_path)
        else:
            print("File: ", sub_path)
            item_1 = {}
            # 是否是根节点
            isFile = True
            # 文件名字
            name = item
            # 文件大小
            size = os.path.getsize(sub_path)
            size = size / float(1024)
            size = round(size, 2)
            # 文件的创建时间
            create_time = os.path.getctime(sub_path)
            create_time = TimeStampToTime(create_time)
            # 获取文件的访问时间
            access_time = os.path.getatime(sub_path)
            access_time = TimeStampToTime(access_time)
            # 获取文件最后修改时间
            modify_time = os.path.getmtime(sub_path)
            modify_time = TimeStampToTime(modify_time)
            # 更新所有信息
            item_1.update(name=name, size=size, create_time=create_time, access_time=access_time,
                          modify_time=modify_time, isFile=isFile)
            #print(item_1)
            result[item] = item_1


def TimeStampToTime(timestamp):
    # 将时间戳变为时间数组
    time_struct = time.localtime(timestamp)
    return time.strftime('%Y-%m-%d %H:%M:%S', time_struct)


if __name__ == '__main__':
	#path为要访问的文件夹
    path = './未来投控'
    #filename为生成的记录文件的路径和文件名
    filename ="res.txt"
    result = {}
    read_directory(path, result)
    json_res = json.dumps(result, indent=2, ensure_ascii=False)
    #print(json_res)
    #要加上编码格式utf-8，这样在读取文件信息时才不会出现乱码
    with open(filename, 'w', encoding='utf-8') as fp:
        fp.write(json_res)