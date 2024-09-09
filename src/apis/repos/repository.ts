import { db } from '@/firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { octokit } from './octokit';

type GetRepoContentsProps = {
  owner: string;
  repo: string;
  path?: string;
};

export async function getRepoContents({ owner, repo, path = '' }: GetRepoContentsProps) {
  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/contents/${path}`, {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data;
  } catch (error) {
    console.error('레포지토리를 가져오는 중 에러가 발생했습니다:', error);
    return null;
  }
}

export async function getRepolist(userName: string = '') {
  try {
    const response = await octokit.request(`GET /users/${userName}/repos`, {
      userName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return response.data;
  } catch (error) {
    console.error('레포지토리 목록를 가져오는 중 에러가 발생했습니다:', error);
    return null;
  }
}

export async function getFileDetail({ owner, repo, path }: GetRepoContentsProps) {
  try {
    const response = await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
      owner,
      repo,
      path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (response.data.length > 0) {
      const createdAt = response.data[0].commit.committer.date;
      const subTitle = response.data[0].commit.message;
      return { createdAt, subTitle };
    } else {
      console.warn('해당 파일에 대한 커밋 내역이 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('파일 정보를 가져오는 중 에러가 발생했습니다:', error);
    return null;
  }
}

export async function getCodeScanResult(path: string): Promise<FileScanResult[]> {
  try {
    const querySelect = query(collection(db, 'codeScanResult'), where('result.path', '==', path));

    const querySnapshot = await getDocs(querySelect);
    const results: FileScanResult[] = [];

    querySnapshot.forEach(doc => {
      results.push({ ...doc.data() } as FileScanResult);
    });

    console.log('검사 완료 파일을 불러왔습니다.', results);
    return results;
  } catch (error) {
    console.error('검사 완료 파일을 불러오는데 실패하였습니다.', error);
    throw new Error('Firestore 데이터 가져오기 실패');
  }
}

export async function getFileStatus({ userName, repoName }: fetchCodeStatusProps) {
  const results: CodeStatusResult[] = [];

  const prefix = `${userName}/${repoName}`;

  const q = query(
    collection(db, 'codeScanResult'),
    where('result.path', '>=', prefix),
    where('result.path', '<', `${prefix}\uf8ff`),
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    const data = doc.data();
    const { path } = data.result;

    results.push({
      path,
      type: data.result.issues && data.result.issues.length > 0 ? 'error' : 'success',
    });
  });
  console.log(results);
  return results;
}
