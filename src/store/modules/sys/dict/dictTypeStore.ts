import { defineStore } from 'pinia';
import { getDictTypeList, dictTypeDelete } from '@/api/sys/dict';
import { dictDataStore } from './dictDataStore';
import { da } from 'element-plus/es/locale';

export const dictTypeStore = defineStore('dictType', {
  state: () => {
    return {
      dictTypeRef: ref<InstanceType<typeof ElTree>>(),
      dictTypeTreeData: [],
      expandedKeys: [],
      dictTypeFormRef: ref<FormInstance>(),
      addEditRef: ref<HTMLFormElement | null>(null),
      loading: false,
      tableData: [],
      total: 0,
      form: {
        dictType: '',
        dictName: '',
        status: 1,
        page: 1,
        size: 20,
      },
    };
  },
  actions: {
    async dictTypeList() {
      const data = await getDictTypeList();
      this.dictTypeTreeData = [
        {
          sysDictTypeId: '',
          dictName: '全部字典',
          children: data?.data ?? [],
        },
      ];
      this.expandedKeys.push('');
    },
    handleAddOrEdit(row: any) {
      if (this.addEditRef) {
        this.addEditRef.form.sysDictTypeId = row?.sysDictTypeId;
        this.addEditRef.init();
      }
    },
    handleDelete(row: any) {
      if (row.sysDictTypeId) {
        ElMessageBox.confirm('您将进行删除操作,是否继续?', '温馨提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(async () => {
            await dictTypeDelete(row.sysDictTypeId);
            this.dictTypeList();
          })
          .catch(() => {});
      }
    },

    handleNodeClick(data: any) {
      const useDictDataStore = dictDataStore();
      useDictDataStore.form.sysDictTypeId = data.sysDictTypeId;
      useDictDataStore.queryData();
    },
  },
});
