# coding=utf-8
import sys
import os.path
import os
import json
import time
from pathlib import Path

work_dir = "References"

def ftree(tmp):
    tmp = tmp.replace(" ", "_")
    tmp = tmp.replace("-", "_")
    tmp = tmp.replace("－", "_")
    tmp = tmp.replace("(", "_")
    tmp = tmp.replace("（", "_")
    tmp = tmp.replace("）", "")
    tmp = tmp.replace(")", "")
    return tmp

def read_directory(path, result, directory, tree_fp):
    paths = os.listdir(path)
    childRoot = os.listdir(path)
    childRoot = [s for s in childRoot if '.DS_Store' not in s]
    FilePath = path
    #print(path)
    isFile = True

    if os.path.isdir(path):
        # 判断是文件夹
        isFile = False
        #directory.update(name=os.path.basename(path))
        directory[os.path.basename(path)]={}
        directory[os.path.basename(path)].update(name=os.path.basename(path), childRoot=childRoot, 
                                                 directory=FilePath, isFile=isFile)
        print("Directory: ", path)
        # 如果是目录，则创建下列信息
        if len(paths) >= 2:
            lines = []
            lines.append("```mermaid\n")
            lines.append("graph TB\n")
            for i, item in enumerate(paths):
                # 跳过一些不用的文件
                if 'DS_Store' in item:
                    continue
                # 输出文件基本信息
                sub_path = os.path.join(path, item)
                if os.path.isdir(sub_path):
                    tree_start = ftree(os.path.basename(path))
                    tree_end = ftree(os.path.basename(sub_path))
                    lines.append("   " + tree_start + " --> " + tree_end + "\n")
            lines.append("```\n")
            if len(lines) > 3:
                for line in lines:
                    if len(lines) >= 5:
                        tree_fp.write(line.replace("graph TB", "graph LR"))
                    else:
                        tree_fp.write(line)

    # 如果是文件，则创建下列信息
    for i, item in enumerate(paths):
        # 跳过一些不用的文件
        if 'DS_Store' in item:
            continue
        # 输出文件基本信息
        sub_path = os.path.join(path, item)
        if os.path.isdir(sub_path):
            #directory[item] = {}
            #directory[item].update(name=item)
            #read_directory(sub_path, result, directory[item])
            read_directory(sub_path, result, directory, tree_fp)
        else:
            item_1 = {}
            # 是否是根节点
            isFile = True
            # 文件名字
            name = item
            # 文件大小
            size = os.path.getsize(sub_path)
            size = size / float(1024) / float(1024)
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
            item_1.update(name=name, size=str(size) + "MB", create_time=create_time, access_time=access_time,
                          modify_time=modify_time, location=path, isFile=isFile, 
                          link="[" + name + "](file://" + os.path.join(path, name) + ")")
            #print(item_1)
            result[item] = item_1


def TimeStampToTime(timestamp):
    # 将时间戳变为时间数组
    time_struct = time.localtime(timestamp)
    return time.strftime('%Y-%m-%d %H:%M:%S', time_struct)


if __name__ == '__main__':
    #path为要访问的文件夹
    if (len(sys.argv) == 2):
        if os.path.exists(sys.argv[1]):
            path = sys.argv[1][:-1]
            opt_dir = os.path.basename(path)
            base_dir = os.path.dirname(os.getcwd())
            path = os.path.join(base_dir, opt_dir)
            print("Target Dirctory: ", path)
            print("Work Dirctory: ", os.path.join(".", work_dir))
            Path(work_dir).mkdir(parents=True, exist_ok=True)
        else:
            print("dfetcher.py: Invaild Directory")
            quit()
    else:
        print("Usage: dfetcher [Directory]")
        quit()
    #filename为生成的记录文件的路径和文件名
    filename = os.path.join(work_dir, "fres.json")
    dirname = os.path.join(work_dir, "dres.json")
    treename = os.path.join(work_dir, "tree.md")
    result = {}
    directory = {}
    treefile = open(treename, 'w', encoding='utf-8')
    read_directory(path, result, directory, treefile)
    close(treefile)
    # Dumping Files
    json_res = json.dumps(result, indent=2, ensure_ascii=False)
    #要加上编码格式utf-8，这样在读取文件信息时才不会出现乱码
    with open(filename, 'w', encoding='utf-8') as fp:
        fp.write(json_res)
    # Dumping Files
    json_res = json.dumps(directory, indent=2, ensure_ascii=False)
    with open(dirname, 'w', encoding='utf-8') as fp:
        fp.write(json_res)